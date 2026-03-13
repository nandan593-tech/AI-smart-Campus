
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const apiService = {
    async sendChatMessage(message) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            if (!response.ok) throw new Error('Failed to send message');
            return await response.json();
        } catch (error) {
            console.error('Chat API Error:', error);
            throw error;
        }
    },

    async submitComplaint(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/complaint`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to submit complaint');
            return await response.json();
        } catch (error) {
            console.error('Complaint API Error:', error);
            throw error;
        }
    },

    async getStudentMarks() {
        try {
            // For demo purposes, we'll return mock data if the API doesn't exist
            // In a real app, this would be: const response = await fetch(`${API_BASE_URL}/api/marks`);

            const mockMarks = [
                { subject: 'Data Structures', marks: 85, status: 'Good' },
                { subject: 'Operating Systems', marks: 32, status: 'Low Performance' },
                { subject: 'Computer Networks', marks: 78, status: 'Good' },
                { subject: 'Software Engineering', marks: 45, status: 'Average' },
                { subject: 'Discrete Math', marks: 28, status: 'Low Performance' },
            ];

            return mockMarks;
        } catch (error) {
            console.error('Marks API Error:', error);
            throw error;
        }
    },

    async getComplaints() {
        // Admin/Mentor view
        const mockComplaints = [
            { id: 1, complaintType: 'Hostel', description: 'Water issue in hostel block A', submittedTime: '2024-03-20 10:00 AM', status: 'Pending' },
            { id: 2, complaintType: 'Academic', description: 'Request for extra lab hours', submittedTime: '2024-03-19 02:30 PM', status: 'Resolved' },
            { id: 3, complaintType: 'Facilities', description: 'Library AC not working', submittedTime: '2024-03-21 09:15 AM', status: 'In Review' },
        ];
        return mockComplaints;
    },

    async getMentorDashboardData() {
        return {
            totalStudents: 45,
            lowMarksStudents: 12,
            alertsSent: 8,
            studentsAtRisk: [
                { name: 'John Doe', subject: 'Calculus', marks: 35, riskLevel: 'Academic Risk' },
                { name: 'Alice Smith', subject: 'Physics', marks: 38, riskLevel: 'Academic Risk' },
                { name: 'Bob Johnson', subject: 'Linear Algebra', marks: 30, riskLevel: 'Academic Risk' },
            ]
        };
    }
};
