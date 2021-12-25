const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  /*programPlace: {
    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state:{
      type: String,
      required: true,
    },
    country:{
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },
  },*/

  package: [
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      service: {
        type: mongoose.Schema.ObjectId,
        ref: "Service",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  /*paymentInfo: {
    id: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },*/
  confirmProgram: {
    type: String,
    required: true,
    default: " Pending",
  },


  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },

  
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Program", programSchema);
