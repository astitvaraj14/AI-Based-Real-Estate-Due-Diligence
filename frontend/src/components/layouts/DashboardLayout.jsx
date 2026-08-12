import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import toast from "react-hot-toast";
import AiChatWidget from "../ui/AiChatWidget";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Get logged in user ID from localStorage
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    
    const user = JSON.parse(userStr);
    
    // Connect to WebSocket
    // Derive WS URL from API URL (e.g. replace /api with /ws)
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
    const wsUrl = apiUrl.replace("/api", "/ws");

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      onConnect: () => {
        console.log("Connected to Real-time Notification Server");
        client.subscribe(`/topic/notifications/${user.id}`, (msg) => {
          if (msg.body) {
            const notification = JSON.parse(msg.body);
            toast(notification.message, {
              icon: '🔔',
              duration: 5000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
      }
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 print:h-auto print:overflow-visible print:bg-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        <Header />

        <main className="flex-1 overflow-y-auto print:overflow-visible">

          {/* Background */}
          <div className="min-h-full bg-slate-50 dark:bg-slate-950 transition-colors">

            {/* Content */}
            <div className="mx-auto w-full max-w-7xl px-8 py-8 lg:px-10 overflow-hidden print:overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </main>

      </div>

      <AiChatWidget />
    </div>
  );
}