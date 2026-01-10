--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.job_applications (
    id integer NOT NULL,
    job_id integer NOT NULL,
    applicant_user_id integer NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying,
    application_date timestamp with time zone DEFAULT now(),
    assigned_location character varying(255),
    assigned_details text,
    assigned_image_urls text[],
    assigned_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.job_applications OWNER TO udaysagar;

--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.job_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_applications_id_seq OWNER TO udaysagar;

--
-- Name: job_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.job_applications_id_seq OWNED BY public.job_applications.id;


--
-- Name: job_images; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.job_images (
    id integer NOT NULL,
    job_id integer NOT NULL,
    image_url character varying(255) NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.job_images OWNER TO udaysagar;

--
-- Name: job_images_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.job_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_images_id_seq OWNER TO udaysagar;

--
-- Name: job_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.job_images_id_seq OWNED BY public.job_images.id;


--
-- Name: job_interests; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.job_interests (
    id integer NOT NULL,
    job_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.job_interests OWNER TO udaysagar;

--
-- Name: job_interests_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.job_interests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_interests_id_seq OWNER TO udaysagar;

--
-- Name: job_interests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.job_interests_id_seq OWNED BY public.job_interests.id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    pay numeric(10,2) NOT NULL,
    pay_type character varying(50) NOT NULL,
    category character varying(100) NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    total_hours numeric(5,2),
    location character varying(255) NOT NULL,
    posted_by_user_id integer NOT NULL,
    status character varying(50) DEFAULT 'open'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    private_details text,
    private_image_urls text[],
    deleted_at timestamp with time zone
);


ALTER TABLE public.jobs OWNER TO udaysagar;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO udaysagar;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    job_id integer,
    content text NOT NULL,
    sent_at timestamp with time zone DEFAULT now(),
    is_read boolean DEFAULT false
);


ALTER TABLE public.messages OWNER TO udaysagar;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO udaysagar;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: ratings_reviews; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.ratings_reviews (
    id integer NOT NULL,
    job_id integer NOT NULL,
    reviewer_user_id integer NOT NULL,
    reviewed_user_id integer NOT NULL,
    rating numeric(2,1) NOT NULL,
    review_text text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT ratings_reviews_rating_check CHECK (((rating >= 1.0) AND (rating <= 5.0)))
);


ALTER TABLE public.ratings_reviews OWNER TO udaysagar;

--
-- Name: ratings_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.ratings_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_reviews_id_seq OWNER TO udaysagar;

--
-- Name: ratings_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.ratings_reviews_id_seq OWNED BY public.ratings_reviews.id;


--
-- Name: user_ratings; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.user_ratings (
    id integer NOT NULL,
    rated_user_id integer NOT NULL,
    rater_user_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_ratings_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.user_ratings OWNER TO udaysagar;

--
-- Name: user_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.user_ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_ratings_id_seq OWNER TO udaysagar;

--
-- Name: user_ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.user_ratings_id_seq OWNED BY public.user_ratings.id;


--
-- Name: user_reports; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.user_reports (
    id integer NOT NULL,
    reported_user_id integer NOT NULL,
    reporter_user_id integer NOT NULL,
    reason character varying(255) NOT NULL,
    details text,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_reports OWNER TO udaysagar;

--
-- Name: user_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.user_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_reports_id_seq OWNER TO udaysagar;

--
-- Name: user_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.user_reports_id_seq OWNED BY public.user_reports.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: udaysagar
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    phone character varying(20),
    rating numeric(2,1) DEFAULT 0.0,
    total_jobs_worked integer DEFAULT 0,
    total_hours_worked numeric(6,2) DEFAULT 0.0,
    location character varying(255),
    preferred_distance integer,
    avatar_url character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    role character varying(50) DEFAULT 'job_seeker'::character varying,
    is_verified boolean DEFAULT false,
    is_suspended boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO udaysagar;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: udaysagar
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO udaysagar;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udaysagar
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: job_applications id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_applications ALTER COLUMN id SET DEFAULT nextval('public.job_applications_id_seq'::regclass);


--
-- Name: job_images id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_images ALTER COLUMN id SET DEFAULT nextval('public.job_images_id_seq'::regclass);


--
-- Name: job_interests id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_interests ALTER COLUMN id SET DEFAULT nextval('public.job_interests_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: ratings_reviews id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.ratings_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_reviews_id_seq'::regclass);


--
-- Name: user_ratings id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_ratings ALTER COLUMN id SET DEFAULT nextval('public.user_ratings_id_seq'::regclass);


--
-- Name: user_reports id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_reports ALTER COLUMN id SET DEFAULT nextval('public.user_reports_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.job_applications (id, job_id, applicant_user_id, status, application_date, assigned_location, assigned_details, assigned_image_urls, assigned_at, updated_at) FROM stdin;
3	8	3	job_deleted	2025-06-15 14:32:16.178094-04	Houghton	AT SDC	{}	2025-06-15 14:32:16.178094-04	2025-06-16 18:24:36.219346-04
2	7	1	job_deleted	2025-06-15 14:08:02.247119-04	Houghton	Gates	{}	2025-06-15 14:08:02.247119-04	2025-06-16 18:24:41.469699-04
13	7	2	job_deleted	2025-06-16 11:12:16.525626-04	Houghton	se	{}	2025-06-16 11:12:16.525626-04	2025-06-16 18:24:41.469699-04
24	5	1	job_deleted	2025-06-16 18:25:05.808329-04	Houghton	You are hired!	{}	2025-06-16 18:25:05.808329-04	2025-06-16 18:28:16.085861-04
27	16	4	assigned	2025-06-16 19:21:26.924575-04	Houghton	1802 Woodmar Drive is my apt	{}	2025-06-16 19:21:26.924575-04	2025-06-16 19:21:26.924575-04
30	17	5	assigned	2026-01-05 15:45:51.638927-05	Michigan	1802 Woodmar Drive in Houghton	{}	2026-01-05 15:45:51.638927-05	2026-01-05 15:45:51.638927-05
\.


--
-- Data for Name: job_images; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.job_images (id, job_id, image_url, uploaded_at) FROM stdin;
\.


--
-- Data for Name: job_interests; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.job_interests (id, job_id, user_id, created_at) FROM stdin;
78	15	2	2025-06-16 16:29:05.037928-04
79	14	2	2025-06-16 16:29:06.631707-04
80	13	2	2025-06-16 16:29:07.658074-04
81	12	2	2025-06-16 16:29:08.693419-04
82	11	2	2025-06-16 16:29:09.909356-04
83	10	2	2025-06-16 16:29:10.615546-04
84	9	2	2025-06-16 16:29:11.641524-04
85	8	2	2025-06-16 16:29:12.810774-04
86	7	2	2025-06-16 16:29:13.608378-04
87	6	2	2025-06-16 16:29:14.84326-04
88	4	2	2025-06-16 16:29:16.075837-04
89	3	2	2025-06-16 16:29:16.868615-04
90	16	4	2025-06-16 19:17:18.566072-04
91	16	3	2025-06-16 19:17:29.586845-04
92	16	1	2025-06-16 19:17:59.427507-04
31	2	3	2025-06-13 15:34:18.659849-04
38	1	1	2025-06-13 16:42:37.385975-04
42	7	3	2025-06-15 14:07:21.540197-04
43	6	3	2025-06-15 14:07:22.785313-04
44	7	1	2025-06-15 14:07:37.757322-04
45	6	1	2025-06-15 14:07:38.44614-04
46	5	1	2025-06-15 14:07:39.419837-04
49	8	1	2025-06-15 14:31:30.124191-04
50	8	4	2025-06-15 14:31:43.229006-04
52	9	1	2025-06-15 14:56:56.457599-04
53	9	4	2025-06-15 14:57:07.119878-04
54	4	4	2025-06-15 14:58:41.731322-04
55	3	3	2025-06-15 15:21:12.403574-04
56	11	3	2025-06-15 15:22:58.295582-04
57	11	1	2025-06-15 15:23:15.365937-04
120	17	6	2026-01-05 15:34:00.848681-05
122	17	5	2026-01-06 23:23:07.626202-05
64	5	2	2025-06-15 16:59:02.118545-04
66	2	2	2025-06-15 16:59:05.401885-04
67	1	2	2025-06-15 16:59:07.371368-04
68	12	3	2025-06-16 10:20:25.197303-04
69	12	1	2025-06-16 10:20:41.3875-04
73	14	3	2025-06-16 12:53:52.396778-04
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.jobs (id, title, description, pay, pay_type, category, start_time, end_time, total_hours, location, posted_by_user_id, status, created_at, updated_at, private_details, private_image_urls, deleted_at) FROM stdin;
14	Need ride	My car ain't starting this morning. I need ride to my work	20.00	flat	Driving	2025-06-16 13:15:00-04	2025-06-16 13:30:00-04	0.25	Houghton	2	open	2025-06-16 12:16:22.761344-04	2025-06-16 18:24:13.00692-04	\N	\N	2025-06-16 18:24:13.00692-04
13	Dog Walker	I need someone to walk my dog this evening. I'm going on a date	20.00	flat	Dog Walking	2025-06-16 18:00:00-04	2025-06-16 19:00:00-04	1.00	Houghton	2	open	2025-06-16 11:46:49.804587-04	2025-06-16 18:24:16.778538-04	\N	\N	2025-06-16 18:24:16.778538-04
12	Massage Therapist	I need someone to massage my legs. They are sore.	20.00	hourly	Caregiving	2025-06-18 11:00:00-04	2025-06-18 12:00:00-04	1.00	Houghton	2	open	2025-06-16 10:20:01.663363-04	2025-06-16 18:24:20.600714-04	\N	\N	2025-06-16 18:24:20.600714-04
11	Bottle supplier	I need someone to supply bottles to customers	12.00	hourly	Customer Service	2025-06-18 15:22:00-04	2025-06-19 15:22:00-04	24.00	Houghton	2	open	2025-06-15 15:22:37.803266-04	2025-06-16 18:24:24.18641-04	\N	\N	2025-06-16 18:24:24.18641-04
17	Pet Care	I need someone to take care after my dog for 2 days. I'll be out of town	100.00	flat	Pet Care	2026-01-06 15:16:00-05	2026-01-08 15:16:00-05	48.00	Michigan	6	filled	2026-01-05 15:17:15.126999-05	2026-01-05 15:45:54.975662-05	1802 Woodmar Drive in Houghton	{}	\N
10	IT job	..	40.00	hourly	IT	2025-06-15 15:02:00-04	2025-06-24 15:02:00-04	216.00	Houghton	2	open	2025-06-15 15:02:17.129647-04	2025-06-16 18:24:29.302673-04	\N	\N	2025-06-16 18:24:29.302673-04
9	Cook	Need a cook for a week. I am not feeling well.	10.00	hourly	Food Services	2025-06-15 14:56:00-04	2025-06-21 14:56:00-04	144.00	Houghton	2	open	2025-06-15 14:56:34.663005-04	2025-06-16 18:24:32.731149-04	\N	\N	2025-06-16 18:24:32.731149-04
8	Life Guard	Need 3 life guards for my pool. 	15.00	hourly	Childcare	2025-06-15 14:29:00-04	2025-06-16 14:29:00-04	24.00	Houghton	2	assigned	2025-06-15 14:30:27.909518-04	2025-06-16 18:24:36.218388-04	\N	\N	2025-06-16 18:24:36.218388-04
7	Desk Attendant	I need a person to manage my facility	12.00	hourly	IT	2025-06-15 14:06:00-04	2025-06-16 14:06:00-04	24.00	Houghton	2	assigned	2025-06-15 14:06:32.791785-04	2025-06-16 18:24:41.468633-04	\N	\N	2025-06-16 18:24:41.468633-04
3	Gym Trainer	My gym trainer is on leave today. So I need someone to train my biceps!	30.00	flat	Miscellaneous	2025-06-13 17:00:00-04	2025-06-13 18:30:00-04	1.50	Houghton	3	open	2025-06-13 15:26:22.241767-04	2025-06-16 18:26:25.228498-04	\N	\N	2025-06-16 18:26:25.228498-04
5	Dining	Need a waiter for my bar. 8 hours shift each day.	13.00	hourly	Customer Service	2025-06-16 08:00:00-04	2025-06-23 08:00:00-04	168.00	Houghton	2	assigned	2025-06-15 12:58:24.899662-04	2025-06-16 18:28:16.084415-04	\N	\N	2025-06-16 18:28:16.084415-04
1	Math Tutor	Need a math tutor for my kid	11.00	hourly	Tutoring	2025-06-13 16:34:00-04	2025-06-13 21:34:00-04	5.00	HOUGHTON	1	open	2025-06-12 16:34:18.70506-04	2025-06-16 18:28:36.7126-04	\N	\N	2025-06-16 18:28:36.7126-04
4	Need sellers for my art	I painted a few arts. I need someone to sell them for me.	20.00	flat	Customer Service	2025-06-13 17:20:00-04	2025-06-28 17:20:00-04	360.00	Houghton	4	open	2025-06-13 17:20:47.12819-04	2025-06-16 18:29:01.255874-04	\N	\N	2025-06-16 18:29:01.255874-04
16	Cook	I need someone to cook food for me for 3 days	50.00	hourly	Miscellaneous	2025-06-17 19:15:00-04	2025-06-19 19:15:00-04	15.00	Houghton	2	filled	2025-06-16 19:16:57.488862-04	2025-06-16 19:22:17.407953-04	1802 Woodmar Drive is my apt	{}	\N
6	Desk Attendant	I need a desk attendant for my Facility	12.48	hourly	Customer Service	2025-06-15 14:05:00-04	2025-06-25 14:05:00-04	240.00	Houghton	2	open	2025-06-15 14:05:53.50452-04	2025-06-16 18:09:51.434044-04	\N	\N	2025-06-16 18:09:51.434044-04
15	Need companion	I need someone to talk to me	20.00	flat	Caregiving	2025-06-16 12:30:00-04	2025-06-16 15:31:00-04	2.00	Houghton	2	open	2025-06-16 12:31:32.230879-04	2025-06-16 18:17:58.87453-04	My address is 2007G	{}	2025-06-16 18:17:58.87453-04
2	Need ride to Airport	I am traveling to New York. Someone please give me a ride to Airport	25.00	flat	Miscellaneous	2025-06-14 14:00:00-04	2025-06-14 14:20:00-04	0.33	Houghton	2	open	2025-06-13 13:55:18.178903-04	2025-06-16 18:18:26.932272-04	\N	\N	2025-06-16 18:18:26.932272-04
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.messages (id, sender_id, receiver_id, job_id, content, sent_at, is_read) FROM stdin;
\.


--
-- Data for Name: ratings_reviews; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.ratings_reviews (id, job_id, reviewer_user_id, reviewed_user_id, rating, review_text, created_at) FROM stdin;
\.


--
-- Data for Name: user_ratings; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.user_ratings (id, rated_user_id, rater_user_id, rating, comment, created_at) FROM stdin;
4	2	3	1	\N	2025-06-16 16:05:34.335199-04
5	4	3	4	\N	2025-06-16 16:06:01.458225-04
6	1	3	1	\N	2025-06-16 16:06:17.974512-04
7	2	1	5	\N	2025-06-16 16:06:59.554599-04
3	1	2	2	\N	2025-06-16 18:28:02.603541-04
2	4	2	5	\N	2025-06-16 19:19:15.35385-04
1	3	2	5	\N	2025-06-16 19:23:03.874709-04
20	2	5	5	\N	2026-01-05 15:10:07.801415-05
21	6	5	2	\N	2026-01-05 15:18:23.074781-05
\.


--
-- Data for Name: user_reports; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.user_reports (id, reported_user_id, reporter_user_id, reason, details, status, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: udaysagar
--

COPY public.users (id, name, email, password_hash, phone, rating, total_jobs_worked, total_hours_worked, location, preferred_distance, avatar_url, created_at, updated_at, role, is_verified, is_suspended) FROM stdin;
1	Sagar Reddy Meka	sagar@hirely.com	$2b$10$wvZVCzQ8u.989al.fSU1POlUiihCFKNGUFWvLRSWJyyrFQlJy5CQi	4085056436	0.0	0	0.00	HOUGHTON	0	\N	2025-06-12 13:40:41.139184-04	2025-06-12 16:35:25.278191-04	job_seeker	f	f
3	Reddy 	reddy@hirely.com	$2b$10$BA0k2JQRwoEiR291v/vf5ulCR117bGjOBjPP/phNKO8hB.SGBQer.	\N	0.0	0	0.00	Houghton	3	\N	2025-06-13 14:22:53.973711-04	2025-06-13 14:22:53.973711-04	job_seeker	f	f
4	Harika Vajrala	harika@hirely.com	$2b$10$Q6.qM2MLchCrkR1HZb/wDuJY/shDPGv/VKyUxppKGtIFnQAgX3kYm	9062314393	0.0	0	0.00	Houghton	3	\N	2025-06-13 17:18:31.165411-04	2025-06-13 17:18:31.165411-04	job_seeker	f	f
6	sagar	sagar@gmail.com	$2b$10$s5JfXk/Z4ClRNVwvb8ie1O.M/8Vjuhk2f4yaioO53A3ph/c2Ao3O2	\N	0.0	0	0.00	Michigan	25	\N	2026-01-05 15:14:51.553732-05	2026-01-05 15:14:51.553732-05	job_seeker	f	f
2	Uday Sagar	uday@hirely.com	$2b$10$hvaE9o/M0GvjrIpl.cAWA.h6u8njKpDbibFUO5Eu9Ds1YYTFeDqzq	4085056436	0.0	0	0.00	Houghton	0	\N	2025-06-12 17:04:30.98767-04	2025-06-16 18:24:04.261713-04	admin	f	f
5	Uday	uday@gmail.com	$2b$10$HAGKCFC2U5eCt6enWwfM5OTdgSgwAQBwW4GZV2XsXWPwii74RRNj2	\N	0.0	0	0.00	Michigan	25	\N	2026-01-05 15:06:11.752783-05	2026-01-05 15:06:11.752783-05	admin	f	f
\.


--
-- Name: job_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.job_applications_id_seq', 30, true);


--
-- Name: job_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.job_images_id_seq', 1, false);


--
-- Name: job_interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.job_interests_id_seq', 122, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.jobs_id_seq', 17, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: ratings_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.ratings_reviews_id_seq', 1, false);


--
-- Name: user_ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.user_ratings_id_seq', 21, true);


--
-- Name: user_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.user_reports_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udaysagar
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: job_images job_images_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_images
    ADD CONSTRAINT job_images_pkey PRIMARY KEY (id);


--
-- Name: job_interests job_interests_job_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_interests
    ADD CONSTRAINT job_interests_job_id_user_id_key UNIQUE (job_id, user_id);


--
-- Name: job_interests job_interests_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_interests
    ADD CONSTRAINT job_interests_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: ratings_reviews ratings_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.ratings_reviews
    ADD CONSTRAINT ratings_reviews_pkey PRIMARY KEY (id);


--
-- Name: job_applications unique_job_applicant; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT unique_job_applicant UNIQUE (job_id, applicant_user_id);


--
-- Name: user_ratings user_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_ratings
    ADD CONSTRAINT user_ratings_pkey PRIMARY KEY (id);


--
-- Name: user_ratings user_ratings_rated_user_id_rater_user_id_key; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_ratings
    ADD CONSTRAINT user_ratings_rated_user_id_rater_user_id_key UNIQUE (rated_user_id, rater_user_id);


--
-- Name: user_reports user_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: job_applications job_applications_applicant_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_applicant_user_id_fkey FOREIGN KEY (applicant_user_id) REFERENCES public.users(id);


--
-- Name: job_applications job_applications_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id);


--
-- Name: job_images job_images_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_images
    ADD CONSTRAINT job_images_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id);


--
-- Name: job_interests job_interests_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_interests
    ADD CONSTRAINT job_interests_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: job_interests job_interests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.job_interests
    ADD CONSTRAINT job_interests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: jobs jobs_posted_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_posted_by_user_id_fkey FOREIGN KEY (posted_by_user_id) REFERENCES public.users(id);


--
-- Name: messages messages_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id);


--
-- Name: messages messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id);


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- Name: ratings_reviews ratings_reviews_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.ratings_reviews
    ADD CONSTRAINT ratings_reviews_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id);


--
-- Name: ratings_reviews ratings_reviews_reviewed_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.ratings_reviews
    ADD CONSTRAINT ratings_reviews_reviewed_user_id_fkey FOREIGN KEY (reviewed_user_id) REFERENCES public.users(id);


--
-- Name: ratings_reviews ratings_reviews_reviewer_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.ratings_reviews
    ADD CONSTRAINT ratings_reviews_reviewer_user_id_fkey FOREIGN KEY (reviewer_user_id) REFERENCES public.users(id);


--
-- Name: user_ratings user_ratings_rated_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_ratings
    ADD CONSTRAINT user_ratings_rated_user_id_fkey FOREIGN KEY (rated_user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_ratings user_ratings_rater_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_ratings
    ADD CONSTRAINT user_ratings_rater_user_id_fkey FOREIGN KEY (rater_user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_reports user_reports_reported_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_reported_user_id_fkey FOREIGN KEY (reported_user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_reports user_reports_reporter_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: udaysagar
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_reporter_user_id_fkey FOREIGN KEY (reporter_user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

