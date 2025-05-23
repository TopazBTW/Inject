export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: true,
  apiUrl: 'http://localhost:8081' // Replace with your production API URL
};
