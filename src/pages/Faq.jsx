import React from 'react';

const Faq = () => {
    return (
        <section className="py-10 bg-base-100">
            <div className="max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <h2 className="text-4xl font-bold text-center text-primary mb-8">
                    Frequently Asked Questions
                </h2>
                <p className="text-center text-lg text-gray-600 mb-10">
                    Have questions about our movie platform? We've got you covered!
                </p>
                
                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {/* Question 1 */}
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="faq-accordion" defaultChecked />
                        <div className="collapse-title text-lg font-medium">
                            What is the subscription cost?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Our platform offers a variety of subscription plans starting at just $9.99/month. You can choose the plan that fits your movie-watching needs!
                            </p>
                        </div>
                    </div>

                    {/* Question 2 */}
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            Can I watch movies offline?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Yes! With our premium plan, you can download movies and watch them offline anytime, anywhere.
                            </p>
                        </div>
                    </div>

                    {/* Question 3 */}
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            Are there any ads?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Our basic plan includes limited ads, but our premium and family plans offer an ad-free experience for uninterrupted movie time.
                            </p>
                        </div>
                    </div>

                    {/* Question 4 */}
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            How many devices can I stream on simultaneously?
                        </div>
                        <div className="collapse-content">
                            <p>
                                You can stream on up to 4 devices simultaneously with our family plan. The basic and premium plans allow 1 and 2 devices, respectively.
                            </p>
                        </div>
                    </div>

                    {/* Question 5 */}
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            Do you have a free trial?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Absolutely! We offer a 7-day free trial for all new users to explore our platform and enjoy unlimited movies and shows.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
