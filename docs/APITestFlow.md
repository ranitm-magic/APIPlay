# API Testing Framework Flow Diagram

```mermaid
graph TD
    subgraph Test File
        A[api.test.ts] --> B[Test Cases]
        B --> C[PostsService Instance]
        B --> D[UsersService Instance]
    end

    subgraph Service Layer
        C --> E[APIClient Base Class]
        D --> E
        E --> F[HTTP Methods<br/>GET/POST/PUT/DELETE]
    end

    subgraph Request/Response Flow
        F --> G[Build URL + Parameters]
        G --> H[Make HTTP Request]
        H --> I[Receive Response]
        I --> J[APIAssertions]
    end

    subgraph Assertions
        J --> K[Assert Status]
        J --> L[Assert Response Body]
        J --> M[Assert Array Response]
    end
```

## Detailed Component Overview

### 1. APIClient (Base Class)
```mermaid
classDiagram
    class APIClient {
        -request: APIRequestContext
        -baseUrl: string
        +constructor(request, baseUrl)
        #get(endpoint, options)
        #post(endpoint, options)
        #put(endpoint, options)
        #delete(endpoint, options)
        -buildUrl(endpoint, params)
    }
```

### 2. Service Classes
```mermaid
classDiagram
    APIClient <|-- PostsService
    APIClient <|-- UsersService
    class PostsService {
        +getAllPosts()
        +getPostById(id)
        +createPost(post)
        +updatePost(id, post)
        +deletePost(id)
        +getPostComments(postId)
    }
    class UsersService {
        +getAllUsers()
        +getUserById(id)
        +getUserPosts(userId)
    }
```

### 3. Test Execution Flow
```mermaid
sequenceDiagram
    participant Test as Test Case
    participant Service as Service Class
    participant API as APIClient
    participant Server as JSON Placeholder API
    participant Assert as APIAssertions

    Test->>Service: Call API Method
    Service->>API: Call HTTP Method
    API->>API: Build URL
    API->>Server: Make HTTP Request
    Server-->>API: HTTP Response
    API-->>Service: Response
    Service-->>Test: Response
    Test->>Assert: Validate Response
    Assert-->>Test: Validation Result
```

## Key Components Description

1. **APIClient (Base Class)**
   - Handles base HTTP operations
   - Manages URL construction
   - Handles common request/response logic

2. **Service Classes**
   - Extend APIClient
   - Provide specific API endpoint methods
   - Handle domain-specific logic

3. **APIAssertions**
   - Provides reusable test assertions
   - Validates response status
   - Validates response body
   - Handles array responses

4. **Test Files**
   - Define test cases
   - Initialize services
   - Execute API calls
   - Validate responses