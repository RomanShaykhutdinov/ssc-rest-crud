package springBoot.web.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import springBoot.web.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User getUserByUsername(String username);

}
