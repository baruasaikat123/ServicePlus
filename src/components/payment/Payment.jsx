// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import './payment.css'

// const CARD_OPTIONS = {
// 	iconStyle: "solid",
// 	style: {
// 		base: {
// 			iconColor: "#c4f0ff",
// 			color: "#fff",
// 			fontWeight: 500,
// 			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
// 			fontSize: "16px",
// 			fontSmoothing: "antialiased",
// 			":-webkit-autofill": { color: "#fce883" },
// 			"::placeholder": { color: "#87bbfd" }
// 		},
// 		invalid: {
// 			iconColor: "#ffc7ee",
// 			color: "#ffc7ee"
// 		}
// 	}
// }


// const Payment = () => {

//     const [success, setSuccess] = useState(false)
//     const stripe = useStripe()
//     const elements = useElements()

//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         // const { error, paymentMethod} = await stripe.createPaymentMethod({
//         //     type: 'card',
//         //     card: elements.getElement(CardElement)
//         // })

//         const card = elements.getElement(CardElement)
//         const result = await stripe.createToken(card)

//         if (result.error) {
//             console.log(result.error.message);
//         }
//         else {
//             console.log(result.token);
//         }

//         /*if (!error) {
//             try {
//                 const { id } = paymentMethod
//                 const response = await axios.post('http://localhost:4000/payment', {
//                     amount: 1000,
//                     id
//                 })
    
//                 if (response.data.success) {
//                     console.log('successful payment')
//                     setSuccess(true)
//                 }
    
//             } catch (err) {
//                 console.log("Error", err);
//             }
//         }
//         else {
//             console.log(error.message);
//         }*/
//     }

//     return (
//         <>
//             {!success ?
//                 <form onSubmit={handleSubmit}>
//                     <fieldset className='FormGroup'>
//                         <div className="FormRow">
//                             <CardElement options={CARD_OPTIONS} />
//                         </div>
//                     </fieldset>
//                     <button>Pay</button>
//                 </form>
//                 :
//                 <div>
//                     <h2>Congrats!!!</h2>
//                 </div>
//             }
//         </>
//     )
// }

// export default Payment

import Logo from '../../images/app-logo.png'

const Payment = () => {

    function loadRazorpay() {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)

        })
     
    }

    async function displayRazorPay() {

        const res = await loadRazorpay()

        if (!res) {
            alert('failed to load!')
            return
        }

        const options = {
            "key": "rzp_test_Y7XJnavo1eAg1j", 
            "amount": 1000, 
            "currency": "INR",
            "name": "SERVICEFINDER",
            "description": "Pay to book your service",
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObj = new window.Razorpay(options)
        paymentObj.open()
    }
   

    /*const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
    
            script.onload = () => {
                resolve(true)
            }
    
            script.onerror = () => {
                resolve(false)
            }
    
            document.body.appendChild(script)
        })
    }

    const displayRazorPay = async(amount) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Failed to load!')
            return
        }

        const options = {
            key: 'rzp_test_Y7XJnavo1eAg1j',
            currency: 'INR',
            amount: amount * 100,
            name: 'SERVICEFINDER',
            description: 'Pay to book your service',
          
            handler: function (response) {
                console.log(response)
                alert('payment successfull')
            },
            prefill: {
                name: 'SERVICEFINDER'
            }
        }

        const paymentObj = new window.Razorpay(options)
        paymentObj.open()
    }*/

    return (
        <div>
            <button onClick={() => displayRazorPay()}>Pay</button>
        </div>
    )
}

export default Payment