import React from 'react';
import logofooter from './assets/SWIFTfooter1.png'
const Footer = () => {
    return (
        <footer className="footer">

            {/* Widgets - Bootstrap Brain Component */}
            <section className="bg-light py-4 py-md-5 py-xl-8 border-top border-light">
                <div className="container overflow-hidden">
                    <div className="row gy-4 gy-lg-0 justify-content-xl-between">
                        <div className="col-12 col-md-4 col-lg-3 col-xl-2" >
                            <div className="widget" >
                                    <img src={logofooter} alt="BootstrapBrain Logo" width="280" height="60" />
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                            <div className="widget">
                                <h4 className="widget-title mb-4">Get in Touch</h4>
                                <address className="mb-4">8014 Edith Blvd NE, Albuquerque, New York, United States</address>
                                <p className="mb-1">
                                    <a className="link-secondary text-decoration-none" href="tel:+15057922430">(505) 792-2430</a>
                                </p>
                                <p className="mb-0">
                                    <a className="link-secondary text-decoration-none" href="mailto:demo@yourdomain.com">demo@yourdomain.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                            <div className="widget">
                                <h4 className="widget-title mb-4">Learn More</h4>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="#!" className="link-secondary text-decoration-none">About</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#!" className="link-secondary text-decoration-none">Contact</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#!" className="link-secondary text-decoration-none">Advertise</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#!" className="link-secondary text-decoration-none">Terms of Service</a>
                                    </li>
                                    <li className="mb-0">
                                        <a href="#!" className="link-secondary text-decoration-none">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 col-xl-4">
                            <div className="widget">
                                <h4 className="widget-title mb-4">Our Newsletter</h4>
                                <p className="mb-4">Subscribe to our newsletter to get our news & discounts delivered to you.</p>
                                <form action="#!">
                                    <div className="row gy-4">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <span className="input-group-text" id="email-newsletter-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                    </svg>
                                                </span>
                                                <input type="email" className="form-control" id="email-newsletter" value="" placeholder="Email Address" aria-label="email-newsletter" aria-describedby="email-newsletter-addon" required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-primary" type="submit">Subscribe</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Copyright - Bootstrap Brain Component */}
            <div className="bg-light py-4 py-md-5 py-xl-8 border-top border-light-subtle">
                <div className="container overflow-hidden">
                    <div className="row gy-4 gy-md-0">
                        <div className="col-xs-12 col-md-7 order-1 order-md-0">
                            <div className="copyright text-center text-md-start">
                                &copy; 2024. All Rights Reserved.
                            </div>
                            <div className="mkd">
                                Swift Cart org.
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-5 order-0 order-md-1">
                            <ul className="nav justify-content-center justify-content-md-end">
                                <li className="nav-item">
                                    <a className="nav-link link-dark" href="#!">
                                        <img src="https://cdn1.iconfinder.com/data/icons/social-media-2285/512/Colored_Facebook3_svg-512.png" width="24" height="24"></img>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-dark" href="#!">
                                        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png" width="24" height="24"></img>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-dark" href="#!">
                                        <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-512.png" width="24" height="24"></img>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-dark" href="#!">
                                        <img src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png" width="24" height="24"></img>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div></footer>)
};
export default Footer;