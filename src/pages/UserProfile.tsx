import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Mail, Key } from 'lucide-react';
import { RootState } from '../store';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const UserProfile: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('John Doe'); // Replace with actual user data
  const [newEmail, setNewEmail] = useState(email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log('Profile updated');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log('Password changed');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User />}
              />
              <Input
                label="Email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                icon={<Mail />}
              />
              <Button type="submit">Update Profile</Button>
            </form>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                icon={<Key />}
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<Key />}
              />
              <Button type="submit">Change Password</Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
