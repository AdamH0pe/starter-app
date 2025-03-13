import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    // Create a subscription price if it doesn't exist (you might want to create this in your Stripe dashboard instead)
    const price = await stripe.prices.create({
      unit_amount: 1000, // £10.00 per month
      currency: 'gbp',
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: 'Monthly Subscription',
      },
    });

    // Create a subscription checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/payment`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating subscription session:', error);
    return NextResponse.json(
      { error: 'Error creating subscription session' },
      { status: 500 }
    );
  }
} 