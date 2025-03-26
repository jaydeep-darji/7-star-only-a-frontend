document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const bookingForm = document.getElementById('bookingForm');
  const durationSelect = document.getElementById('duration');
  const timeSlotSelect = document.getElementById('timeSlot');
  const amountInput = document.getElementById('amount');
  const paymentMethodRadios = document.getElementsByName('paymentMethod');
  const onlinePaymentDetails = document.getElementById('onlinePaymentDetails');
  const cardTypeRadios = document.getElementsByName('cardType');
  const cardDetails = document.getElementById('cardDetails');
  const upiDetails = document.getElementById('upiDetails');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const paymentForm = document.getElementById('payment-form');
  const bookingConfirmation = document.getElementById('booking-confirmation');

  // Time slot options based on duration
  const timeSlots = {
      '1': ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM', '9:00 PM - 10:00 PM', '10:00 PM - 11:00 PM', '11:00 PM - 12:00 AM'],
      '2': ['10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM', '10:00 PM - 12:00 AM'],
      '3': ['10:00 AM - 1:00 PM', '1:00 PM - 4:00 PM', '4:00 PM - 7:00 PM', '7:00 PM - 10:00 PM']
  };

  // Price for each duration
  const prices = {
      '1': 400,
      '2': 700,
      '3': 900
  };

  // Handle duration change
  function handleDurationChange() {
      const duration = durationSelect.value;
      
      // Clear previous options
      timeSlotSelect.innerHTML = '<option value="">Select Time Slot</option>';
      
      // Update time slots based on duration
      if (duration) {
          const slots = timeSlots[duration];
          slots.forEach(slot => {
              const option = document.createElement('option');
              option.value = slot;
              option.textContent = slot;
              timeSlotSelect.appendChild(option);
          });
          
          // Update amount
          amountInput.value = '₹' + prices[duration];
      } else {
          amountInput.value = '';
      }
  }

  // Attach event listener to duration select
  durationSelect.addEventListener('change', handleDurationChange);

  // Handle payment method change
  paymentMethodRadios.forEach(radio => {
      radio.addEventListener('change', function() {
          if (this.value === 'online') {
              onlinePaymentDetails.style.display = 'block';
          } else {
              onlinePaymentDetails.style.display = 'none';
          }
      });
  });

  // Handle card type change
  cardTypeRadios.forEach(radio => {
      radio.addEventListener('change', function() {
          if (this.value === 'upi') {
              cardDetails.style.display = 'none';
              upiDetails.style.display = 'block';
          } else {
              cardDetails.style.display = 'block';
              upiDetails.style.display = 'none';
          }
      });
  });

  // Format expiry date input
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
      expiryInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 2) {
              value = value.substring(0, 2) + '/' + value.substring(2, 4);
          }
          e.target.value = value;
      });
  }

  // Generate random booking ID
  function generateBookingId() {
      return 'BCT' + Math.floor(100000 + Math.random() * 900000);
  }

  // Form submission
  bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('username').value;
      const duration = durationSelect.options[durationSelect.selectedIndex].text;
      const timeSlot = timeSlotSelect.value;
      const amount = amountInput.value;
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      
      // Show loading overlay
      loadingOverlay.style.display = 'flex';
      
      // Simulate payment processing
      setTimeout(function() {
          // Hide loading overlay
          loadingOverlay.style.display = 'none';
          
          // Hide payment form
          paymentForm.style.display = 'none';
          
          // Update confirmation details
          document.getElementById('bookingId').textContent = generateBookingId();
          document.getElementById('confirmName').textContent = username;
          document.getElementById('confirmDuration').textContent = duration;
          document.getElementById('confirmTimeSlot').textContent = timeSlot;
          document.getElementById('confirmAmount').textContent = amount;
          document.getElementById('confirmPayment').textContent = paymentMethod === 'online' ? 'Online Payment' : 'Pay at Venue';
          
          // Show booking confirmation
          bookingConfirmation.style.display = 'block';
      }, 2000);
  });

  // Card number formatting (spaces after every 4 digits)
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
      cardNumberInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 16) {
              value = value.substring(0, 16);
          }
          e.target.value = value;
      });
  }

  // CVV input validation (only numbers)
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
      cvvInput.addEventListener('input', function(e) {
          e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
      });
  }

  // Mobile number validation
  const mobileInput = document.getElementById('mobile');
  if (mobileInput) {
      mobileInput.addEventListener('input', function(e) {
          e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
      });
  }
});

// Make the handleDurationChange function global so it can be called from HTML
function handleDurationChange() {
  const durationSelect = document.getElementById('duration');
  const timeSlotSelect = document.getElementById('timeSlot');
  const amountInput = document.getElementById('amount');
  
  const timeSlots = {
      '1': ['6:00 AM - 7:00 AM', '7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM', '9:00 PM - 10:00 PM'],
      '2': ['6:00 AM - 8:00 AM', '8:00 AM - 10:00 AM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM', '8:00 PM - 10:00 PM'],
      '3': ['6:00 AM - 9:00 AM', '5:00 PM - 8:00 PM', '7:00 PM - 10:00 PM']
  };
  
  const prices = {
      '1': 400,
      '2': 700,
      '3': 900
  };
  
  const duration = durationSelect.value;
  
  // Clear previous options
  timeSlotSelect.innerHTML = '<option value="">Select Time Slot</option>';
  
  // Update time slots based on duration
  if (duration) {
      const slots = timeSlots[duration];
      slots.forEach(slot => {
          const option = document.createElement('option');
          option.value = slot;
          option.textContent = slot;
          timeSlotSelect.appendChild(option);
      });
      
      // Update amount
      amountInput.value = '₹' + prices[duration];
  } else {
      amountInput.value = '';
  }
}