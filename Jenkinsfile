pipeline {
    agent any
    // REMOVE the 'tools' block since we don't have jdk11 or maven configured in Jenkins
    stages {
        stage('Build and Test') {
            steps {
                script {
                    // Check available tools
                    bat 'java --version'
                    // Install Maven manually for this build (Windows example)
                    bat 'curl -o apache-maven-3.8.1-bin.zip https://archive.apache.org/dist/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.zip'
                    bat 'tar -xf apache-maven-3.8.1-bin.zip'
                    bat 'set PATH=apache-maven-3.8.1\\bin;%PATH% && mvn --version'
                    bat 'set PATH=apache-maven-3.8.1\\bin;%PATH% && mvn clean package'
                }
            }
        }
    }
}