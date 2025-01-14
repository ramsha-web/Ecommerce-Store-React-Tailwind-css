import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters long"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("contactFormData"));
    if (savedFormData) {
    
      setValue("email", savedFormData.email);
      setValue("subject", savedFormData.subject);
      setValue("message", savedFormData.message);
      setValue("terms", savedFormData.terms);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    setFormSubmitted(true);

    localStorage.setItem("contactFormData", JSON.stringify(data));

    setTimeout(() => {
      reset(); 
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section className="bg-white p-8 max-w-4xl mx-auto">
      <h1 className="mb-4 text-4xl font-bold text-center text-black-800">
        Contact Us
      </h1>
      <p className="mb-8 text-xl text-center text-gray-600">
        Have a question about a product? Need help with your order? Reach out to us.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-800">
            Your email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full p-3 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="name@domain.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block mb-2 font-medium text-gray-800">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject")}
            className={`w-full p-3 border rounded-md ${
              errors.subject ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Let us know how we can help you"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block mb-2 font-medium text-gray-800">
            Your message
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows="6"
            className={`w-full p-3 border rounded-md ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Leave a comment..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm text-gray-800">
            I agree to the{" "}
            <a href="/terms" className="text-orange-500 underline">
              Terms and Conditions
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`${
            isValid ? "bg-orange-500 cursor-pointer" : "bg-orange-500 opacity-50 cursor-not-allowed"
          } text-white text-sm font-medium py-4 px-4 rounded-md transition-all duration-300 ease-in-out`}
        >
          Send message
        </button>

        {formSubmitted && (
          <div className="mt-6 text-center text-green-600 font-semibold">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}
      </form>
    </section>
  );
};

export default ContactUs;
