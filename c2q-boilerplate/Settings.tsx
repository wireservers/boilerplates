import { useState } from 'react';
import { User, Users, Save, Edit, Trash2, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation Schemas
const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (555) 123-4567'),
  role: z.enum(['admin', 'doctor', 'nurse', 'staff']),
  department: z.string().min(2, 'Department is required'),
});

const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (555) 123-4567'),
  role: z.enum(['admin', 'doctor', 'nurse', 'staff']),
  department: z.string().min(2, 'Department is required'),
  status: z.enum(['active', 'inactive']),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type UserFormData = z.infer<typeof userSchema>;

interface SystemUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  department: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

const initialUsers: SystemUser[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@eldercare.com',
    phone: '(555) 000-0001',
    role: 'admin',
    department: 'Administration',
    status: 'active',
    lastLogin: '2024-11-14 08:00',
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@eldercare.com',
    phone: '(555) 100-2001',
    role: 'doctor',
    department: 'Geriatric Medicine',
    status: 'active',
    lastLogin: '2024-11-14 07:30',
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Roberts',
    email: 'eroberts@eldercare.com',
    phone: '(555) 100-2002',
    role: 'doctor',
    department: 'Cardiology',
    status: 'active',
    lastLogin: '2024-11-14 07:45',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'swilliams@eldercare.com',
    phone: '(555) 100-3001',
    role: 'nurse',
    department: 'Nursing',
    status: 'active',
    lastLogin: '2024-11-14 07:00',
  },
  {
    id: '5',
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jmartinez@eldercare.com',
    phone: '(555) 100-3002',
    role: 'nurse',
    department: 'Nursing',
    status: 'active',
    lastLogin: '2024-11-14 07:00',
  },
];

export function Settings() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Profile Form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@eldercare.com',
      phone: '(555) 000-0001',
      role: 'admin',
      department: 'Administration',
    },
  });

  // New User Form
  const newUserForm = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'staff',
      department: '',
      status: 'active',
    },
  });

  // Edit User Form
  const editUserForm = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile updated:', data);
    alert('Profile updated successfully!');
  };

  const onAddUser = (data: UserFormData) => {
    const newUser: SystemUser = {
      id: (users.length + 1).toString(),
      ...data,
    };
    setUsers([...users, newUser]);
    setIsAddingUser(false);
    newUserForm.reset();
    alert('User added successfully!');
  };

  const onEditUser = (data: UserFormData) => {
    if (!editingUserId) return;
    setUsers(users.map(user => 
      user.id === editingUserId ? { ...user, ...data } : user
    ));
    setEditingUserId(null);
    editUserForm.reset();
    alert('User updated successfully!');
  };

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const startEditUser = (user: SystemUser) => {
    setEditingUserId(user.id);
    editUserForm.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      status: user.status,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'doctor': return 'default';
      case 'nurse': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Settings & User Management</h1>
        <p className="text-gray-500">Manage your profile and system users</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            My Profile
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...profileForm.register('firstName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {profileForm.formState.errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...profileForm.register('lastName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {profileForm.formState.errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      {...profileForm.register('email')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {profileForm.formState.errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...profileForm.register('phone')}
                      placeholder="(555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {profileForm.formState.errors.phone && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </Label>
                    <select
                      {...profileForm.register('role')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="admin">Administrator</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="staff">Staff</option>
                    </select>
                    {profileForm.formState.errors.role && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.role.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block text-sm text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...profileForm.register('department')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {profileForm.formState.errors.department && (
                      <p className="text-sm text-red-600 mt-1">
                        {profileForm.formState.errors.department.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Password Change Section */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm text-gray-700 mb-2">Current Password</Label>
                  <Input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm text-gray-700 mb-2">New Password</Label>
                  <Input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="block text-sm text-gray-700 mb-2">Confirm New Password</Label>
                  <Input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{users.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Total Users</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{users.filter(u => u.status === 'active').length}</p>
                  <p className="text-sm text-gray-500 mt-1">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{users.filter(u => u.role === 'doctor').length}</p>
                  <p className="text-sm text-gray-500 mt-1">Doctors</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{users.filter(u => u.role === 'nurse').length}</p>
                  <p className="text-sm text-gray-500 mt-1">Nurses</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add User Button */}
          <div className="flex justify-end">
            <Button 
              onClick={() => setIsAddingUser(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </div>

          {/* Add User Form */}
          {isAddingUser && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add New User</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setIsAddingUser(false);
                      newUserForm.reset();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={newUserForm.handleSubmit(onAddUser)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...newUserForm.register('firstName')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {newUserForm.formState.errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">
                          {newUserForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...newUserForm.register('lastName')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {newUserForm.formState.errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">
                          {newUserForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        {...newUserForm.register('email')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {newUserForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {newUserForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...newUserForm.register('phone')}
                        placeholder="(555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {newUserForm.formState.errors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          {newUserForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        Role <span className="text-red-500">*</span>
                      </Label>
                      <select
                        {...newUserForm.register('role')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="admin">Administrator</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="staff">Staff</option>
                      </select>
                      {newUserForm.formState.errors.role && (
                        <p className="text-sm text-red-600 mt-1">
                          {newUserForm.formState.errors.role.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...newUserForm.register('department')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {newUserForm.formState.errors.department && (
                        <p className="text-sm text-red-600 mt-1">
                          {newUserForm.formState.errors.department.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="block text-sm text-gray-700 mb-2">
                        Status <span className="text-red-500">*</span>
                      </Label>
                      <select
                        {...newUserForm.register('status')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddingUser(false);
                        newUserForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.id}>
                    {editingUserId === user.id ? (
                      // Edit Form
                      <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                        <form onSubmit={editUserForm.handleSubmit(onEditUser)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                First Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                {...editUserForm.register('firstName')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {editUserForm.formState.errors.firstName && (
                                <p className="text-sm text-red-600 mt-1">
                                  {editUserForm.formState.errors.firstName.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                Last Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                {...editUserForm.register('lastName')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {editUserForm.formState.errors.lastName && (
                                <p className="text-sm text-red-600 mt-1">
                                  {editUserForm.formState.errors.lastName.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                type="email"
                                {...editUserForm.register('email')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {editUserForm.formState.errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                  {editUserForm.formState.errors.email.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                Phone <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                {...editUserForm.register('phone')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {editUserForm.formState.errors.phone && (
                                <p className="text-sm text-red-600 mt-1">
                                  {editUserForm.formState.errors.phone.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                              </Label>
                              <select
                                {...editUserForm.register('role')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="admin">Administrator</option>
                                <option value="doctor">Doctor</option>
                                <option value="nurse">Nurse</option>
                                <option value="staff">Staff</option>
                              </select>
                            </div>

                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                Department <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                {...editUserForm.register('department')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {editUserForm.formState.errors.department && (
                                <p className="text-sm text-red-600 mt-1">
                                  {editUserForm.formState.errors.department.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm text-gray-700 mb-2">
                                Status <span className="text-red-500">*</span>
                              </Label>
                              <select
                                {...editUserForm.register('status')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setEditingUserId(null);
                                editUserForm.reset();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      // User Card
                      <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-700">
                                {user.firstName[0]}{user.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-gray-900">{user.firstName} {user.lastName}</p>
                                <Badge variant={getRoleBadgeColor(user.role)} className="capitalize">
                                  {user.role}
                                </Badge>
                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                  {user.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <p className="text-sm text-gray-500">{user.department}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditUser(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        {user.lastLogin && (
                          <div className="mt-2 text-xs text-gray-500">
                            Last login: {user.lastLogin}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}