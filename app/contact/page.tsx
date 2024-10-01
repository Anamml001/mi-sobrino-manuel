"use client"
import { useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
    const form = useRef<HTMLFormElement | null>(null);

    const sendEmail = (event: FormEvent) => {
        event.preventDefault();

        if (form.current) {
            emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
            ).then((result: any) => {
                alert('Message sent successfully...');
                console.log(result.text);
                form.current?.reset(); // Limpiar los campos del formulario.
            }).catch((error: any) => {
                console.error('Error sending email:', error);
            });
        }
    };

    return (
        <div className="flex flex-col height-full mt-10">
            <h1 className="font-bold text-2xl text-center text-green-900">CONTACTO</h1>
            <div className="object-left p-8 my-8">
                <form ref={form} onSubmit={sendEmail} className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="from_name">
                                First Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                name="from_name"
                                id="from_name"
                                type="text"
                                placeholder="Jane"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="from_email">
                                E-mail
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="from_email"
                                id="from_email"
                                type="email"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                name="message"
                                id="message"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                            <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                Enviar
                            </button>
                        </div>
                        <div className="md:w-2/3"></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
