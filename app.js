const express = require("express");
const app = express()
require("dotenv").config();
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'abc617d15ccd10f7'
const store_passwd = 'abc617d15ccd10f7@ssl'
const is_live = false //true for live, false for sandbox

const { API_PORT,PORT } = process.env;
const port = PORT || API_PORT;



//sslcommerz init
app.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: port + '/success',
        fail_url:  port + '/fail',
        cancel_url: port + '/cancel',
        ipn_url: port + '/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        // res.redirect(GatewayPageURL)
        res.send(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
})
//sslcommerz validation 

app.get('/validate', (req, res) => {
    const data = {
        val_id:ADGAHHGDAKJ456454 //that you go from sslcommerz response
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.validate(data).then(data => {
        //process the response that got from sslcommerz 
       // https://developer.sslcommerz.com/doc/v4/#order-validation-api
    });
}) 
//SSLCommerz initiateRefund

app.get('/initiate-refund', (req, res) => {
    const data = {
        refund_amount:10,
        refund_remarks:'',
        bank_tran_id:CB5464321445456456,
        refe_id:EASY5645415455,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.initiateRefund(data).then(data => {
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
    });
})
//SSLCommerz refundQuery

app.get('/refund-query', (req, res) => {
    const data = {
        refund_ref_id:SL4561445410,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.refundQuery(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
    });
})

app.get('/', (req, res) => {
    res.send("Welcome!")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
