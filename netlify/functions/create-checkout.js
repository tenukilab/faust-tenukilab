const Stripe = require('stripe')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const { productId, productName, price, userId } = JSON.parse(event.body)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: productName,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/shop/cancel`,
      metadata: {
        productId,
        userId: userId || 'guest',
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
