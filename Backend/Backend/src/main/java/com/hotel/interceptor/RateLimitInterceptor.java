package com.hotel.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Map<String, UserRequestData> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 5; // 5 requests
    private static final long TIME_WINDOW = TimeUnit.MINUTES.toMillis(1); // per minute

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientIp = request.getRemoteAddr();
        long currentTime = System.currentTimeMillis();

        requestCounts.compute(clientIp, (ip, data) -> {
            if (data == null || currentTime - data.startTime > TIME_WINDOW) {
                return new UserRequestData(currentTime, 1);
            } else {
                data.count++;
                return data;
            }
        });

        if (requestCounts.get(clientIp).count > MAX_REQUESTS) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("Too many requests. Please try again later.");
            return false;
        }

        return true;
    }

    private static class UserRequestData {
        long startTime;
        int count;

        UserRequestData(long startTime, int count) {
            this.startTime = startTime;
            this.count = count;
        }
    }
}
