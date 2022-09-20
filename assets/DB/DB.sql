--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-09-20 11:07:38

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16787)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    fullname character varying(255),
    picture character varying(255),
    phone character varying(20),
    id_user integer,
    expand bigint,
    income bigint,
    balance bigint DEFAULT 0
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16792)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16793)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    amount bigint,
    time_date timestamp without time zone,
    note text,
    recipient_id integer NOT NULL,
    sender_id integer NOT NULL,
    typetrans_id integer
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16798)
-- Name: transaction_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_type (
    id integer NOT NULL,
    name character varying(255),
    description text
);


ALTER TABLE public.transaction_type OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16803)
-- Name: transaction_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction_type ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16804)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16805)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    pin character varying(6)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16810)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3335 (class 0 OID 16787)
-- Dependencies: 209
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, fullname, picture, phone, id_user, expand, income, balance) FROM stdin;
18	asdas	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	\N	155	\N	\N	0
19	adas	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	\N	156	\N	\N	0
10	admin Toha	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	081112313	146	\N	\N	94100
15	sad	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	\N	151	\N	\N	51000
9	jhonson baru	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	082216111222	145	\N	\N	851000
11	Sri Marisa	https://res.cloudinary.com/dhvnecfig/image/upload/v1663295981/arttos_cloudinary_folder/1663295979854.png	081112313	148	\N	\N	800000
14	sasa	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	\N	150	\N	\N	0
16	dasdsa	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	\N	152	\N	\N	0
17	asdasdas	https://res.cloudinary.com/dhvnecfig/image/upload/v1662976500/arttos_cloudinary_folder/1662976498635.png	\N	154	\N	\N	0
\.


--
-- TOC entry 3337 (class 0 OID 16793)
-- Dependencies: 211
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, amount, time_date, note, recipient_id, sender_id, typetrans_id) FROM stdin;
\.


--
-- TOC entry 3338 (class 0 OID 16798)
-- Dependencies: 212
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type (id, name, description) FROM stdin;
4	nosubscribe	non
3	Transfer	subscribe
\.


--
-- TOC entry 3341 (class 0 OID 16805)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, pin) FROM stdin;
145	newuser	neuser@mail.com	$2b$10$2Rti130lbgw86GBX4qUN/.QrDpSSq6cc5tXsc1GRp/frfS3lIttFa	321321
146	admin1	admin@mail.com	$2b$10$nia3QjGVc1bnUrDqR4evzOHPFrDOxj.LBWcxkld3ehOFCOkia4qYS	\N
150	srimarisa123	baruuu@mail.com	$2b$10$MLoBI.mbAcrfyOJhkJ5TmOfhGlgqeBA5SXYYHqk0TyPPOqcJtJnFi	\N
151	usernamebaru	emailbaru@mail.com	$2b$10$uT/5JilW5Dgeze.TN1QVaeovdvaOC3if9/74YEwChlNgbVh/aGR7q	\N
152	tesalert	tesalert@mail.com	$2b$10$kl0GsnhyOydWGnhCEqJXQu90N8PgY7iNV59Sp6YowBtgaz6YKn6Qe	\N
154	srimarisa1231	baruuu1@mail.com	$2b$10$jpi7tZmZ9wGjM4Ic68wH3uhgzcrspV3PQmwx2JcLB0PltNDqWEbI6	\N
155	assaaaas	asd1as@asd.as	$2b$10$WdeSF5irPqkrvwsQOBL7Tu5XLy8mvFOxQRm9Nab9BrwLvEMZc2Sxa	\N
156	jhondoe123	jhondoe@mail.com	$2b$10$4YCDXRRZEgH5JWnSkRFd8O96Pfj.z.kLVEiAJ80Sugcqb4qBCHE2u	\N
148	srimarisa	sri@mail.com	$2b$10$kw3iKbIa3JUsf8mEsxCoM.9ENIjm6XTOuvaWOn36XfcFmhDh2UTFG	321321
\.


--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 210
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 19, true);


--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 213
-- Name: transaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_id_seq', 4, true);


--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 214
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 126, true);


--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 156, true);


--
-- TOC entry 3187 (class 2606 OID 16812)
-- Name: users email_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_un UNIQUE (email);


--
-- TOC entry 3181 (class 2606 OID 16814)
-- Name: profile profile_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pk PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 16816)
-- Name: transaction_type transaction_type_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pk PRIMARY KEY (id);


--
-- TOC entry 3183 (class 2606 OID 16818)
-- Name: transaction transactions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transactions_pk PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16820)
-- Name: users username_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_un UNIQUE (username);


--
-- TOC entry 3191 (class 2606 OID 16822)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 16848)
-- Name: profile profile_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3194 (class 2606 OID 16868)
-- Name: transaction recipient_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT recipient_fk_1 FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3193 (class 2606 OID 16863)
-- Name: transaction sender_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT sender_fk FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3195 (class 2606 OID 16883)
-- Name: transaction transaction_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_fk FOREIGN KEY (typetrans_id) REFERENCES public.transaction_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2022-09-20 11:07:38

--
-- PostgreSQL database dump complete
--

