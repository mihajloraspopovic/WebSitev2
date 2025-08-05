
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_30pvw7q';
const TEMPLATE_ID = 'template_s5njwrf';
const PUBLIC_KEY = 't74J89uVUNDnTXNxd';

const ContactSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInUp', 0);
  const formAnimation = useScrollAnimation('fadeInLeft', 200);
  const infoAnimation = useScrollAnimation('fadeInRight', 400);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon."
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        toast({
          title: "Failed to send message.",
          description: "Please try again later.",
          variant: "destructive"
        });
      });
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-palette-dark text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div ref={titleAnimation.ref}>
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-16 transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('contact.title')}
          </h1>
        </div>
        
        <div className="lg:flex lg:items-start lg:justify-between lg:space-x-16">
          {/* Contact Form */}
          <div ref={formAnimation.ref} className={`lg:w-2/3 mb-12 lg:mb-0 transition-all duration-800 ${formAnimation.animationClass}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-palette-gold font-poppins font-semibold">
                    {t('contact.form.name')} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-palette-dark/50 border-palette-gold/30 text-palette-gold placeholder:text-palette-gold/50 focus:border-palette-gold"
                    placeholder={t('contact.form.name')}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-palette-gold font-poppins font-semibold">
                    {t('contact.form.email')} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-palette-dark/50 border-palette-gold/30 text-palette-gold placeholder:text-palette-gold/50 focus:border-palette-gold"
                    placeholder={t('contact.form.email')}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-palette-gold font-poppins font-semibold">
                  {t('contact.form.subject')}
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-palette-dark/50 border-palette-gold/30 text-palette-gold placeholder:text-palette-gold/50 focus:border-palette-gold"
                  placeholder={t('contact.form.subject_placeholder')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-palette-gold font-poppins font-semibold">
                  {t('contact.form.message')} *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-palette-dark/50 border-palette-gold/30 text-palette-gold placeholder:text-palette-gold/50 focus:border-palette-gold min-h-[120px]"
                  placeholder={t('contact.form.message')}
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full md:w-auto bg-palette-gold hover:bg-palette-gold/90 text-palette-dark font-poppins font-bold py-3 px-8 text-lg transition-colors duration-300 rounded-none"
              >
                {t('contact.form.submit')}
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div ref={infoAnimation.ref} className={`lg:w-1/3 transition-all duration-800 ${infoAnimation.animationClass}`}>
            <div className="bg-palette-gold/10 rounded-lg p-8 space-y-8">
              <div>
                <h3 className="font-poppins font-bold text-2xl mb-6">
                  {t('contact.title')}
                </h3>
                <p className="font-poppins text-paragraph-color mb-8">
                  {t('contact.description')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-palette-gold rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-palette-dark" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-palette-gold">{t('contact.email_label')}</p>
                    <p className="font-poppins text-paragraph-color">hello@mraspopovic.me</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-palette-gold rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-palette-dark" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-palette-gold">{t('contact.phone_label')}</p>
                    <p className="font-poppins text-paragraph-color">+382 69 439 980</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-palette-gold rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-palette-dark" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-palette-gold">{t('contact.availability_label')}</p>
                    <p className="font-poppins text-paragraph-color">{t('contact.availability_text')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
