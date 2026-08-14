package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.entity.Notification;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(NotificationRepository notificationRepository, UserService userService, SimpMessagingTemplate messagingTemplate) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate;
    }

    public void createNotification(Long userId, String title, String message) {
        Notification notification = new Notification(userId, title, message);
        notification = notificationRepository.save(notification);
        
        // Broadcast the real-time notification
        User user = userService.findById(userId);
        messagingTemplate.convertAndSend("/topic/notifications/" + user.getEmail(), notification);
    }

    public List<Notification> getUserNotifications() {
        User user = userService.getLoggedInUser();
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public void markAsRead(Long notificationId) {
        User user = userService.getLoggedInUser();
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            if (notification.getUserId().equals(user.getId())) {
                notification.setRead(true);
                notificationRepository.save(notification);
            }
        });
    }

    public void deleteNotification(Long notificationId) {
        User user = userService.getLoggedInUser();
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            if (notification.getUserId().equals(user.getId())) {
                notificationRepository.delete(notification);
            }
        });
    }
}
