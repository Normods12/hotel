// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Register user (Mocked)
export const registerUser = async (userData) => {
  await delay(1000);
  return { success: true, message: "User registered successfully" };
};

// Login user (returns Mock JWT token)
export const loginUser = async (credentials) => {
  await delay(1000);
  
  if (credentials.email && credentials.password) {
    // Generate a fake JWT-like token (header.payload.signature)
    // Payload contains { "sub": email, "role": "CUSTOMER", "exp": ... }
    const payload = btoa(JSON.stringify({
      sub: credentials.email,
      role: "CUSTOMER",
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    }));
    
    const mockToken = `mock.header.${payload}.signature`;
    localStorage.setItem("token", mockToken);
    return mockToken;
  }
  
  throw new Error("Invalid credentials");
};
