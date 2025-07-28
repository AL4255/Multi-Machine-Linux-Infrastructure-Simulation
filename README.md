# 🔐 Multi-Server IAM Environment

A complete Identity and Access Management (IAM) system built with Docker containers, simulating a modern enterprise infrastructure. Perfect for learning authentication, authorization, system administration, and DevOps practices.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER ACCESS                                   │
└─────────────────────┬───────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    DOCKER NETWORK (172.20.0.0/16)                      │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                │
│  │ WEB-SERVER  │◄──►│ APP-SERVER  │◄──►│ DB-SERVER   │                │
│  │172.20.0.10  │    │172.20.0.30  │    │172.20.0.20  │                │
│  │Gateway      │    │APIs         │    │Data Store   │                │
│  └─────────────┘    └─────────────┘    └─────────────┘                │
│         ▲                   ▲                   ▲                     │
│         │                   │                   │                     │
│         ▼                   ▼                   ▼                     │
│  ┌─────────────┐    ┌─────────────┐                                   │
│  │MONITOR-SERV │◄──►│ IAM-SERVER  │                                   │
│  │172.20.0.40  │    │172.20.0.50  │                                   │
│  │Observability│    │Identity     │                                   │
│  └─────────────┘    └─────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🎯 What This Project Demonstrates

- **Modern Authentication**: JWT tokens, session management, role-based access
- **Microservices Architecture**: Independent services communicating via APIs
- **Container Orchestration**: Docker Compose for multi-container applications
- **Network Security**: Container isolation, reverse proxy, SSL termination
- **System Monitoring**: Health checks, logging, performance metrics
- **DevOps Practices**: Infrastructure as Code, automated deployments

## 🖥️ Server Breakdown

### 🌐 WEB-SERVER (172.20.0.10) - The Gateway
**Role**: Public-facing authentication portal and reverse proxy
- **Technology**: nginx + custom HTML/CSS/JS
- **Access**: http://localhost:8080, SSH port 2201
- **Features**: 
  - Modern login interface
  - User dashboard
  - SSL termination
  - Request routing to backend services

### 🐍 APP-SERVER (172.20.0.30) - Protected Resources  
**Role**: Business logic and API endpoints
- **Technology**: Python (Flask/FastAPI ready)
- **Access**: http://localhost:5001, SSH port 2203
- **Features**:
  - RESTful APIs
  - Token validation middleware
  - Business logic processing
  - Database connectivity

### 🗄️ DB-SERVER (172.20.0.20) - Data Persistence
**Role**: Identity storage and application data
- **Technology**: MySQL 8.0 + Redis (optional)
- **Access**: mysql://localhost:3307, SSH port 2202
- **Features**:
  - User accounts and profiles
  - Role and permission management
  - Session storage
  - Audit logging

### 📊 MONITOR-SERVER (172.20.0.40) - Observability
**Role**: System monitoring and security oversight
- **Technology**: Ubuntu + monitoring tools
- **Access**: SSH port 2204, Grafana port 3000
- **Features**:
  - System health monitoring
  - Authentication analytics
  - Security alerting
  - Log aggregation

### 🔐 IAM-SERVER (172.20.0.50) - Identity Provider
**Role**: Core identity and access management
- **Technology**: Ubuntu + Keycloak/OpenLDAP
- **Access**: SSH port 2205, Keycloak port 8080
- **Features**:
  - User authentication
  - Token issuing and validation
  - Single Sign-On (SSO)
  - Directory services

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- 4GB+ RAM available
- Ports 8080, 5001, 3307, 2201-2205 available

### 1. Clone and Setup
```bash
git clone <repository-url>
cd multi-server-project

# Create directory structure
mkdir -p web-content/{html,css,js,configs}
mkdir -p app-content
mkdir -p logs/{web,db,app,monitor,iam}
mkdir -p scripts/{bash,python}
```

### 2. Start the Environment
```bash
# Start all containers
docker-compose up -d

# Wait for initialization (2-3 minutes)
sleep 180

# Verify all containers are running
docker ps
```

### 3. Access the System
- **Login Portal**: http://localhost:8080
- **App Server**: http://localhost:5001  
- **Database**: `mysql -h localhost -P 3307 -u root -p` (password: rootpass123)

### 4. Demo Credentials
- **Username**: admin
- **Password**: password123

## 📁 Project Structure

```
multi-server-project/
├── docker-compose.yml          # Container orchestration
├── README.md                   # This file
├── web-content/                # Web server files
│   ├── html/                   # HTML pages (login, dashboard)
│   ├── css/                    # Stylesheets
│   ├── js/                     # JavaScript functionality
│   └── configs/                # nginx configurations
├── app-content/                # Application server code
│   ├── api/                    # API endpoints
│   ├── middleware/             # Authentication middleware
│   └── config/                 # App configurations
├── scripts/                    # Automation scripts
│   ├── bash/                   # System administration scripts
│   └── python/                 # Advanced automation
├── logs/                       # Container logs
│   ├── web/                    # nginx access/error logs
│   ├── db/                     # Database logs
│   ├── app/                    # Application logs
│   ├── monitor/                # Monitoring logs
│   └── iam/                    # Identity management logs
└── configs/                    # Additional configurations
```

## 🔧 Management Commands

### Container Management
```bash
# Start all services
docker-compose up -d

# Stop all services  
docker-compose down

# Restart specific service
docker-compose restart web-server

# View logs
docker-compose logs web-server
docker logs web-server --tail 50

# Access container shell
docker exec -it web-server /bin/bash
```

### SSH Access
```bash
# SSH into any server (password: password123)
ssh -p 2201 root@localhost  # Web server
ssh -p 2202 root@localhost  # Database server  
ssh -p 2203 root@localhost  # App server
ssh -p 2204 root@localhost  # Monitor server
ssh -p 2205 root@localhost  # IAM server
```

### Health Checks
```bash
# Quick system status
curl http://localhost:8080/status
curl http://localhost:5001/health

# Test inter-container connectivity
docker exec web-server ping -c 2 db-server
docker exec app-server ping -c 2 iam-server

# Database connectivity
mysql -h localhost -P 3307 -u root -p -e "SHOW DATABASES;"
```

## 🔐 Authentication Flow

```
1. User → WEB-SERVER:8080/login
2. WEB-SERVER → IAM-SERVER:8080/auth (validate credentials)
3. IAM-SERVER → DB-SERVER:3307 (check user database)
4. DB-SERVER → IAM-SERVER (return user data)
5. IAM-SERVER → WEB-SERVER (issue JWT token)
6. WEB-SERVER → User (set authentication cookie)
7. User → APP-SERVER:5001/api/* (with JWT token)
8. APP-SERVER → IAM-SERVER (validate token)
9. APP-SERVER → User (protected resource)
10. MONITOR-SERVER ← (log all authentication events)
```

## 🛠️ Development Workflow

### Adding New Features
1. **Web Interface**: Edit files in `web-content/` - changes are live immediately
2. **API Endpoints**: Modify `app-content/` and restart app-server
3. **Database Changes**: Connect via MySQL client or phpMyAdmin
4. **Monitoring**: Add dashboards to monitor-server
5. **Authentication**: Configure IAM-server policies

### File Persistence
- Files in `web-content/`, `app-content/`, and `scripts/` persist across container restarts
- Database data is stored in Docker volumes
- Logs are mounted to host filesystem for analysis

## 📊 Monitoring and Logging

### Access Logs
```bash
# Web server access logs
tail -f logs/web/access.log

# Application logs
docker logs app-server --follow

# Database logs
docker logs db-server --follow
```

### System Monitoring
- Install Grafana on monitor-server for dashboards
- Set up Prometheus for metrics collection
- Configure alerting for security events

## 🔒 Security Features

### Current Implementation
- Container network isolation
- SSH key-based authentication (configurable)
- Password-protected database access
- Request logging and audit trails
- Input validation and sanitization

### Production Hardening
- Replace default passwords
- Implement SSL/TLS certificates
- Set up proper firewall rules
- Enable fail2ban for brute force protection
- Regular security updates and patching

## 🧪 Learning Exercises

### Beginner
1. Customize the login page design
2. Add new users to the database
3. Create simple API endpoints
4. Set up basic monitoring dashboards

### Intermediate  
1. Implement real JWT authentication
2. Add role-based access control (RBAC)
3. Set up SSL certificates
4. Create automated backup scripts

### Advanced
1. Implement Single Sign-On (SSO) with Keycloak
2. Set up ELK stack for log analysis
3. Create CI/CD pipeline for deployments
4. Implement high availability clustering

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Resources

### Documentation
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [nginx Configuration Guide](https://nginx.org/en/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Keycloak Admin Guide](https://www.keycloak.org/documentation)

### Learning Materials
- [JWT.io - JSON Web Token Introduction](https://jwt.io/introduction/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Troubleshooting

### Common Issues

**Containers won't start**
```bash
# Check Docker daemon status
docker system info

# View detailed logs
docker-compose logs
```

**Port conflicts**  
```bash
# Check what's using ports
lsof -i :8080
netstat -tlnp | grep :8080

# Use different ports in docker-compose.yml
```

**Permission issues**
```bash
# Fix file permissions
chmod +x scripts/bash/*.sh
sudo chown -R $USER:$USER web-content/
```

**Database connection issues**
```bash
# Test database connectivity
docker exec db-server mysql -u root -p -e "SELECT 1;"

# Reset database password
docker exec db-server mysql -u root -p -e "ALTER USER 'root'@'%' IDENTIFIED BY 'newpassword';"
```

### Getting Help
- Check container logs: `docker logs <container-name>`
- Test network connectivity: `docker exec <container> ping <target>`
- Verify file mounts: `docker exec <container> ls -la <path>`
- Review nginx config: `docker exec web-server nginx -t`

---

## 🎯 Next Steps

This project provides a solid foundation for learning modern authentication and system administration. Consider extending it with:

- Real-world SSL certificates
- Advanced monitoring with Prometheus/Grafana  
- Automated testing and CI/CD
- Kubernetes deployment
- Cloud integration (AWS, Azure, GCP)

**Happy learning and building! 🚀**
