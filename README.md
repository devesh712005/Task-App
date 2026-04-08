# 🚀 Task Management System (Microservices + Event-Driven Architecture)

A scalable **Task Management System** built using a **Microservices Architecture** with **Node.js, Express, MongoDB, and RabbitMQ**.
This project demonstrates real-world backend design patterns like **service decoupling, asynchronous communication, and event-driven workflows**.

---

## 🧠 Overview

The system consists of multiple independent services:

* 👤 **User Service** – Manages users (create & fetch users)
* 📌 **Task Service** – Creates and stores tasks
* 🔔 **Notification Service** – Listens to events and processes notifications
* 🐇 **RabbitMQ (Event Broker)** – Handles communication between services
* 🍃 **MongoDB** – Stores user and task data

Each service runs independently and communicates via **RabbitMQ queues**, making the system highly scalable and loosely coupled.

---

## ⚙️ Architecture

* Microservices architecture
* Event-driven communication using RabbitMQ
* Separate databases (MongoDB) per service
* Dockerized services using Docker Compose

---

## 🔄 How It Works (Flow)

1. User sends request → **Task Service**
2. Task is saved in MongoDB
3. Task Service publishes event → `task_created` (RabbitMQ)
4. Notification Service consumes event
5. Notification logic executes (log/email/etc.)

---

## ✨ Features

* ✅ Create and manage users
* ✅ Create tasks with user association
* ✅ Event-driven communication between services
* ✅ Asynchronous processing using RabbitMQ
* ✅ Retry mechanism for RabbitMQ connection
* ✅ Dockerized setup for easy deployment

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Message Broker:** RabbitMQ
* **Containerization:** Docker, Docker Compose

---

## 📦 Services & Ports

| Service              | Port         | Description    |
| -------------------- | ------------ | -------------- |
| User Service         | 3000         | Manage users   |
| Task Service         | 3002         | Manage tasks   |
| Notification Service | 3003         | Event consumer |
| MongoDB              | 27017        | Database       |
| RabbitMQ             | 5672 / 15672 | Message broker |

---

## 🚀 Run Locally

```bash
docker-compose up --build
```

---

## 🎯 Learning Outcomes

* Microservices architecture design
* Event-driven systems (RabbitMQ)
* Service communication & decoupling
* Docker-based deployment
* Real-world backend system design

---

## 📌 Future Improvements

* Add API Gateway
* Authentication & Authorization
* Email/SMS notification integration
* Kubernetes deployment

---

## 👨‍💻 Author

**Devesh Singh Chauhan**

---

🔥 *This project is ideal for backend, DevOps, and system design learning.*
