pipeline {
    agent any
    stages {
        stage('Build and Test') {
            steps {
                script {
                    // Check available tools
                    bat 'java --version'
                    
                    // Install Maven
                    bat 'curl -o apache-maven-3.8.1-bin.zip https://archive.apache.org/dist/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.zip'
                    bat 'tar -xf apache-maven-3.8.1-bin.zip'
                    
                    // Navigate to your project directory first!
                    // Replace 'RideShare' with your actual project folder name if different
                    bat 'cd RideShare && set PATH=../apache-maven-3.8.1\\bin;%PATH% && mvn --version'
                    bat 'cd RideShare && set PATH=../apache-maven-3.8.1\\bin;%PATH% && mvn clean package'
                }
            }
        }
    }
}