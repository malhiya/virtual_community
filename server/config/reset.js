import { pool } from './database.js'
import './dotenv.js'

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events_tb CASCADE;
        
        CREATE TABLE IF NOT EXISTS events_tb (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            location VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            description TEXT,
            image VARCHAR(500)
        );
    `
    
    try {
        await pool.query(createTableQuery)
        console.log('🎉 events_tb table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events_tb table', err)
    }
}

const seedEventsTable = async () => {
    const insertQuery = `
        INSERT INTO events_tb (title, date, time, location, address, city, state, zip, description, image) 
        VALUES 
        ('Annual Tech Summit 2024', '2024-03-15', '09:00:00', 'Tech Hub Conference Center', '789 Innovation Blvd', 'San Jose', 'CA', '95110', 'Join industry leaders for a day of innovation and networking', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDQFA3mAc3afmkbSfPPgNVt3_HAmyFEnY0iA&s'),
        ('Summer Bike Meetup', '2024-07-20', '16:00:00', 'Beachside Pavilion', '321 Ocean Drive', 'Santa Cruz', 'CA', '95060', 'Meet new people and ride bikes along the beach', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTjySrxFEznirn_c5jDicfQlfaNJPSMykh7mxweWYEk3xH20TkaAT0lqtpO8plP8oo1SY&usqp=CAU'),
        ('Charity Gala Dinner', '2024-04-10', '19:00:00', 'The Grand Ballroom', '123 Main St', 'San Francisco', 'CA', '94102', 'An evening of elegance supporting local communities', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMmn7PuN-cLg0V2ICZ3BYJ7RysNunBq5krFg&s'),
        ('Startup Pitch Night', '2024-02-28', '18:30:00', 'Rooftop Garden Lounge', '456 Sky Tower', 'San Francisco', 'CA', '94103', 'Watch emerging startups compete for funding', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkH1ozZ8z3LXPYZxxR9QIuT9s1VUbYOtO_QA&s'),
        ('Classic Film Marathon', '2024-05-05', '14:00:00', 'Historic Theater', '555 Heritage Ave', 'Oakland', 'CA', '94612', 'Experience timeless cinema in a historic setting', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCTOIlC15mdKoCWlGWRFQ-g60Bed5G6NPI6g&s'),
        ('Coding Bootcamp', '2024-03-22', '10:00:00', 'Tech Hub Conference Center', '789 Innovation Blvd', 'San Jose', 'CA', '95110', 'Intensive workshop on modern web development', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYBOrzfR-QewSIp5N-fRHBqiBbTrazzw9vcCfc8xG0OvRBAWxYm5PcSPERLU8UGDvDuWY&usqp=CAU'),
        ('Art Gallery', '2024-06-15', '17:00:00', 'Rooftop Garden Lounge', '456 Sky Tower', 'San Francisco', 'CA', '94103', 'Enjoy local art while tasting regional wines', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZF80nUu1FzE6HjJrXpmsHB-djsCOBZOrpA&s'),
        ('Community Meetup', '2024-04-01', '11:00:00', 'The Grand Ballroom', '123 Main St', 'San Francisco', 'CA', '94102', 'Connect with neighbors and local organizations', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZOUkXNiQZ7r-PDSQ_YaiTHBMTGtTwdV1NMQ&s'),
        ('Yoga & Wellness Retreat', '2024-05-18', '08:00:00', 'Beachside Pavilion', '321 Ocean Drive', 'Santa Cruz', 'CA', '95060', 'Start your day with meditation and yoga by the ocean', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQufw6IjcARzNsfNB6lUOi_l-D4fSj3OI4vLA&s'),
        ('Developer Conference', '2024-06-01', '09:30:00', 'Tech Hub Conference Center', '789 Innovation Blvd', 'San Jose', 'CA', '95110', 'Learn about the latest in software development', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisB5Lg3ooGShwgO811W9iXj3Gj4qUAWPTeg&s')
    `
    
    try {
        await pool.query(insertQuery)
        console.log('🌱 events_tb table seeded successfully')
    } catch (err) {
        console.error('⚠️ error seeding events_tb table', err)
    }
}

const resetDatabase = async () => {
    try {
        console.log('🚀 Starting database reset...')
        
        // Create the events table
        await createEventsTable()
        
        // Seed table with sample data
        await seedEventsTable()
        
        console.log('✅ Database reset completed successfully')
    } catch (err) {
        console.error('❌ Database reset failed', err)
    } finally {
        await pool.end()
    }
}

resetDatabase()