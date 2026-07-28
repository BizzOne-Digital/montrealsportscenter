import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE });

export const fetchHero = () => api.get('/hero').then(r => r.data.data);
export const fetchPrograms = () => api.get('/programs').then(r => r.data.data);
export const fetchMemberships = () => api.get('/memberships').then(r => r.data.data);
export const fetchPricing = () => api.get('/pricing').then(r => r.data.data);
export const fetchTestimonials = () => api.get('/testimonials').then(r => r.data.data);
export const fetchTeam = () => api.get('/team').then(r => r.data.data);
export const fetchGallery = (category) => api.get('/gallery', { params: { category } }).then(r => r.data.data);
export const fetchOffers = () => api.get('/offers').then(r => r.data.data);
export const fetchBlog = (params) => api.get('/blog', { params }).then(r => r.data);
export const fetchBlogPost = (slug) => api.get(`/blog/${slug}`).then(r => r.data.data);
export const fetchSettings = () => api.get('/settings').then(r => r.data.data);
export const submitInquiry = (data) => api.post('/inquiries', data).then(r => r.data);

export default api;
