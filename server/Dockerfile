FROM gradle:6.8.1-jdk11
COPY . .
RUN ./gradlew build
CMD ["java", "-jar", "build/libs/BoredGamerz-0.0.1-SNAPSHOT.jar"]
