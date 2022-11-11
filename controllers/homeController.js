const stripe = require("stripe")(
  "sk_test_51LuI0kLqjtirCdFRG9YCJkAboI5ViaYkLNFMsvXw2ts8kyrjBZgXNwntYdPQMijhlYlF7ME99o202ZPQo1TPATW800iDQAH1CY"
);
const { Types } = require("mongoose");
const moment = require("moment");
const ProjectModel = require("../models/Project");
const DonationModel = require("../models/Donations");
module.exports.details = (req, res) => {
  res.render("details", {
    title: "details page",
    auth: req.cookies.donationUser,
  });
};
module.exports.payment = async (req, res, next) => {
  const { amount, title } = req.body;
  const { id } = req.query;
  console.log("amount", amount);
  req.session.id = id;
  req.session.amount = amount;
  const donationResponse = await DonationModel.create({
    product: id,
    donation: amount,
  });
  // console.log("donation response", donationResponse);
  const ress = await ProjectModel.findOneAndUpdate(
    { _id: id },
    { $push: { donations: donationResponse._id } }
  );
  console.log("ress: ", ress);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: title,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5000",
      cancel_url: "http://localhost:5000",
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.log(error.message);
  }
  next();
};
module.exports.projects = async (req, res) => {
  try {
    const projects = await ProjectModel.find()
      .where("status")
      .equals(1)
      .populate("donations")
      .populate("user");
    res.render("home", {
      title: "Pro funding",
      auth: req.cookies.donationUser,
      projects,
      moment,
    });
    console.log("projects", projects);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.project = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findOne({ _id: id });
    console.log("projects: ", project);
    res.render("project", {
      title: project.title,
      project,
      auth: req.cookies.donationUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.checkOut = async (request, response) => {
  const endpointSecret =
    "whsec_63561ea438fa589a9de6047e5abcae4bdb9a30a0d611804420e18a446611b2f9";
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("payment");
      const paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case "checkout.session.completed":
      console.log("check.session.completed");

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
