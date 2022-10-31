const stripe = require('stripe')('sk_test_51LuI0kLqjtirCdFRG9YCJkAboI5ViaYkLNFMsvXw2ts8kyrjBZgXNwntYdPQMijhlYlF7ME99o202ZPQo1TPATW800iDQAH1CY')
module.exports.details = (req, res) => {
    res.render('details', {title: 'details page', auth: req.cookies.donationUser })
}
module.exports.payment = async (req, res) => {
   try {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
    
      res.redirect(303, session.url);
   } catch (error) {
    console.log(error.message);
   }
}