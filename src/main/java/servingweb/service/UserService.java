package servingweb.service;

import servingweb.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    void saveUser(User user);

    void deleteUser(User user);

    User getUserById(long id);

    void dropPassword(User user);
}

