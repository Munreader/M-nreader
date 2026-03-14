#!/bin/bash
# MÜN OS TUNNEL MONITOR - Simple health check and auto-restart
# Run this in a screen or tmux session, or as a background process

while true; do
    sleep 30
    
    # Check if cloudflared is running
    if ! pgrep -f "cloudflared" > /dev/null; then
        echo "[$(date)] 🔄 Tunnel down - restarting..."
        /tmp/cloudflared tunnel --url http://localhost:3000 > /home/z/my-project/tunnel-log.txt 2>&1 &
        sleep 8
        URL=$(grep -oP 'https://[a-zA-Z0-9-]+\.trycloudflare\.com' /home/z/my-project/tunnel-log.txt | tail -1)
        if [ -n "$URL" ]; then
            echo "$URL" > /home/z/my-project/public/tunnel-url.txt
            echo "[$(date)] ✅ Tunnel restored: $URL"
        fi
    else
        echo "[$(date)] 💚 Tunnel healthy - 13.13 MHz"
    fi
done
