pipeline {
    agent any
    
    environment {
        // Define environment variables
        PROJECT_NAME = 'vahana-project'
        VERSION = '1.0.0'
    }
    
    tools {
        // Define tools (adjust based on your project)
        jdk 'jdk11'
        maven 'maven-3.8.1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/your-username/vahana-project.git'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Adjust based on your project type
                    if (fileExists('pom.xml')) {
                        sh 'mvn clean compile'
                    } else if (fileExists('build.gradle')) {
                        sh 'gradle build'
                    } else if (fileExists('package.json')) {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    if (fileExists('pom.xml')) {
                        sh 'mvn test'
                    } else if (fileExists('build.gradle')) {
                        sh 'gradle test'
                    } else if (fileExists('package.json')) {
                        sh 'npm test'
                    }
                }
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml' // Adjust path as needed
                }
            }
        }
        
        stage('Package') {
            steps {
                script {
                    if (fileExists('pom.xml')) {
                        sh 'mvn package -DskipTests'
                    } else if (fileExists('build.gradle')) {
                        sh 'gradle assemble -x test'
                    }
                    // Archive the built artifact
                    archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Add your deployment logic here
                    // This could be deploying to a server, container registry, etc.
                    echo 'Deploying Vahana project...'
                    
                    // Example: Deploy to a server via SSH
                    // sshagent(['deploy-credentials']) {
                    //     sh 'scp target/*.jar user@server:/path/to/deploy/'
                    // }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            // Add notifications (Slack, Email, etc.)
        }
        failure {
            echo 'Pipeline failed!'
            // Add failure notifications
        }
    }
}