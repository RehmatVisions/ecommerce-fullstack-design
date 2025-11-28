// Simple script to create an admin user
import fetch from 'node-fetch';

const createAdmin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        adminSecret: 'MySpecialAdminPassword123'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('Token:', result.user?.token);
    } else {
      console.log('❌ Error:', result.message);
      if (result.message.includes('Already Exists')) {
        console.log('\n✅ Admin user already exists!');
        console.log('Try logging in with:');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️ Make sure your backend is running on http://localhost:5000');
  }
};

createAdmin();
