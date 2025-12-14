import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { useCareData } from '../../context/CareDataContext';
import { User, UserRole } from '../../types/models';

type FormState = Partial<User>;

const UsersScreen: React.FC = () => {
  const { users, createUser, updateUser, deleteUser } = useCareData();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    role: 'Caregiver',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startNew = () => {
    setEditingId(null);
    setForm({ name: '', email: '', phone: '', role: 'Caregiver' });
    setErrors({});
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setForm({ ...user });
    setErrors({});
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    if (editingId === id) {
      startNew();
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!form.name || !form.name.trim()) {
      next.name = 'Name is required.';
    }
    if (!form.email || !form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      next.email = 'Invalid email format.';
    }
    if (!form.role) {
      next.role = 'Role is required.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      name: form.name!.trim(),
      email: form.email!.trim(),
      phone: (form.phone || '').trim(),
      role: form.role as UserRole,
    };

    if (editingId) {
      await updateUser(editingId, payload);
    } else {
      await createUser(payload);
    }

    startNew();
  };

  return (
    <View className="flex-1 bg-slate-900 p-6">
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-2xl font-semibold text-white mb-1">
            User Profiles
          </Text>
          <Text className="text-xs text-slate-400">
            Dummy profile management with CRUD and client-side validation
          </Text>
        </View>
        <Button onPress={startNew}>
          <ButtonText>{editingId ? 'New user' : 'Clear form'}</ButtonText>
        </Button>
      </View>

      <View className="flex-row gap-6 flex-1">
        <View className="flex-1 bg-slate-950 rounded-2xl p-4">
          <Text className="text-sm font-semibold text-white mb-3">
            {editingId ? 'Edit user' : 'Add new user'}
          </Text>

          <FormControl isInvalid={!!errors.name} className="mb-3">
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Full name"
                value={form.name}
                onChangeText={(text: string) =>
                  setForm((f) => ({ ...f, name: text }))
                }
              />
            </Input>
            {errors.name && (
              <FormControlError>
                <FormControlErrorText>{errors.name}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.email} className="mb-3">
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="name@example.com"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text: string) =>
                  setForm((f) => ({ ...f, email: text }))
                }
              />
            </Input>
            {errors.email && (
              <FormControlError>
                <FormControlErrorText>{errors.email}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl className="mb-3">
            <FormControlLabel>
              <FormControlLabelText>Phone</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Optional"
                value={form.phone}
                onChangeText={(text: string) =>
                  setForm((f) => ({ ...f, phone: text }))
                }
              />
            </Input>
          </FormControl>

          <FormControl isInvalid={!!errors.role} className="mb-4">
            <FormControlLabel>
              <FormControlLabelText>Role</FormControlLabelText>
            </FormControlLabel>
            <View className="flex-row gap-2 mt-2">
              {['Admin', 'Doctor', 'Caregiver'].map((role) => {
                const selected = form.role === role;
                return (
                  <Pressable
                    key={role}
                    onPress={() =>
                      setForm((f) => ({ ...f, role: role as UserRole }))
                    }
                    className={`px-3 py-1 rounded-full border ${
                      selected
                        ? 'bg-emerald-500/20 border-emerald-400'
                        : 'border-slate-600'
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        selected ? 'text-emerald-300' : 'text-slate-300'
                      }`}
                    >
                      {role}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {errors.role && (
              <FormControlError>
                <FormControlErrorText>{errors.role}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <Button onPress={handleSubmit}>
            <ButtonText>{editingId ? 'Update user' : 'Create user'}</ButtonText>
          </Button>
        </View>

        <View className="flex-1 bg-slate-950 rounded-2xl p-4">
          <Text className="text-sm font-semibold text-white mb-3">
            Existing users
          </Text>
          <ScrollView>
            {users.map((u) => (
              <View
                key={u.id}
                className="flex-row justify-between items-center border-b border-slate-800 py-3"
              >
                <View>
                  <Text className="text-sm text-white">{u.name}</Text>
                  <Text className="text-[11px] text-slate-400">
                    {u.role} • {u.email}
                  </Text>
                  {u.phone ? (
                    <Text className="text-[11px] text-slate-500">
                      {u.phone}
                    </Text>
                  ) : null}
                </View>
                <View className="flex-row gap-2">
                  <Button
                    size="sm"
                    onPress={() => startEdit(u)}
                  >
                    <ButtonText>Edit</ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    action="secondary"
                    onPress={() => handleDelete(u.id)}
                  >
                    <ButtonText>Delete</ButtonText>
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UsersScreen;
