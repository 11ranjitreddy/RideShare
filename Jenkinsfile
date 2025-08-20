pipeline {
    agent any
    stages {
        stage('Build and Test') {
            steps {
                script {
                    // First, see what directories exist
                    bat 'dir'
                    
                    // Install Maven
                    bat 'curl -o apache-maven-3.8.1-bin.zip https://archive.apache.org/dist/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.zip'
                    bat 'tar -xf apache-maven-3.8.1-bin.zip'
                    
                    // Try different directory names - your project might be in a subfolder
                    bat 'set PATH=apache-maven-3.8.1\\bin;%PATH% && cd RideShare && mvn clean package || dir && mvn clean package'
                }
            }
        }
    }
}