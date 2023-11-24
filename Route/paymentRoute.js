import express from 'express'
import { processPayment, sendStripeApiKey } from '../controller/payment.js';
export const paymentRouter=express.Router();

paymentRouter.get('/apikey',sendStripeApiKey);
paymentRouter.post('/process/payment',processPayment);
