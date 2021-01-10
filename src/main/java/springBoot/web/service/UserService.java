package springBoot.web.service;

import springBoot.web.model.Role;
import springBoot.web.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    List<User> getAllUsers();

    void saveUser(User user);

    void deleteUser(User user);

    User getUserById(long id);

    void dropPassword(User user);
}

