import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Globe, Shield, Moon } from 'lucide-react';
import Card from '../components/common/Card';
import { Checkbox } from '../components/common/FormElements';
import Dropdown from '../components/common/Dropdown';

const Settings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const languageOptions = ['English', 'Spanish', 'French', 'German'];
  const themeOptions = ['Light', 'Dark', 'System'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <Checkbox
                label="Email Notifications"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <Checkbox
                label="Push Notifications"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
              />
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <Dropdown
                  options={languageOptions}
                  onSelect={(option) => setLanguage(option)}
                  placeholder={language}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <Dropdown
                  options={themeOptions}
                  onSelect={(option) => setTheme(option)}
                  placeholder={theme}
                />
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <div className="space-y-4">
              <Checkbox
                label="Enable Two-Factor Authentication"
                checked={twoFactorAuth}
                onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
