import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './Payment'

const key = 'pk_test_51Kxlk1SCaWBFkKSUUc9qZ4KkU3TyJOTVKbIaPZuder66371WvZtTflbmrZvCgvSnAsB4LFc3hLIP0CLzvLkt481E00V2gdC7gB'

const stripeTestPromise = loadStripe(key)

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <Payment />
        </Elements>
    )
}

export default StripeContainer