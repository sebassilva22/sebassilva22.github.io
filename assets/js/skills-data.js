const skillsData = [
    {
        category: "Backend & Event Architecture",
        technologies: ["JAVA", "SPRING", "JPA", "KAFKA", "REST"],
        description: "REQUEST → JAVA SERVICE → DOMAIN EVENT → KAFKA → AWS"
    },
    {
        category: "AWS & DevOps",
        technologies: ["LAMBDA", "API GATEWAY", "DYNAMODB", "SAM", "DOCKER", "JENKINS"],
        description: ""
    },
    {
        category: "Applied AI / IA aplicada",
        technologies: ["Computer vision", "AI APIs", "model integration", "secure workflows"],
        description: "POST /v1/ai/analyze { \"source\": \"s3://document.png\" } → 202 Accepted { \"jobId\": \"vision-123\" }"
    }
];

export default skillsData;
