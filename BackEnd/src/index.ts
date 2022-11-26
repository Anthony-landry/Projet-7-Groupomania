import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
// create express app
const app = express();
//Envoi le contenu du fichier .env dans l'object process.env
import * as dotenv from "dotenv";
dotenv.config();
const morgan = require("morgan");
const helmet = require("helmet");
// Importe le paquet cors (middleware).
const cors = require("cors");
const rateLimit = require("express-rate-limit");
//importe le paquet path(déjà présent avec node), donne accés au chemin du système de fichiers
const path = require("path");

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection()
	.then(async (connection) => {
		const winston = require("winston");

		const logger = winston.createLogger({
			level: "info",
			format: winston.format.json(),
			defaultMeta: { service: "user-service" },
			transports: [
				new winston.transports.File({ filename: "error.log", level: "error" }),
				new winston.transports.File({ filename: "combined.log" }),
			],
		});
		process.on("uncaughtException", function (error) {
			logger.log("error :", error);
		});
		if (process.env.NODE_ENV !== "production") {
			logger.add(
				new winston.transports.Console({
					format: winston.format.simple(),
				})
			);
		}

		// MIDDLEWARE //

		//Utilisation de morgan en mode dev "format consis"
		app.use(morgan("dev"));

		// middleware d'helmet
		app.use(helmet());
		//Fonction Middleware pour gérer les requêtes cross-origin.
		app.use(cors());

		//protèger l'appli de certaines vulnerabilités en configurant les en-têtes
		app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

		const limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // limiter chaque ID à 100 tentatives
			standardHeaders: true, // Retourne rate limit info dans `RateLimit-*` headers
			legacyHeaders: false, // Désactive  `X-RateLimit-*` headers
		});

		//La limitation empêche la même adresse IP de faire trop de requests qui nous aideront à prévenir des attaques comme "force brute".
		app.use(limiter);

		app.use(bodyParser.json());
		app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.setHeader(
				"Access-Control-Allow-Methods",
				"GET, POST, OPTIONS, PUT, PATCH, DELETE"
			);
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept"
			);
			req.header("Content-Type");
			req.header("Accept");
			next();
		});

		//Fonction middleware intégrée dans Express. Il analyse les requests entrantes avec des charges utiles codées en URL et est basé sur un analyseur de corps.
		app.use(
			express.urlencoded({
				extended: true,
			})
		);

		//La ressource "images" est géré de manière statique dès qu'elle reçoit une requête vers la route /images.
		//La méthode express.static : Pour servir des fichiers statiques tels que les images
		//La méthode path.join() joint les segments de chemin spécifiés en un seul chemin.
		app.use("/", routes);
		// app.use("/uploads", express.static(__dirname + "../../uploads"));
		app.use(express.static("uploads"));
		app.listen(3000);

		console.log(
			"Express application is up and running on port 3000,",
			"Environnement de : " + process.env.NODE_ENV
		);
	})
	.catch((error) => console.log("TypeORM connection erreurr: ", error));
