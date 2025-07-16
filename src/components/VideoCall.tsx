import { useEffect, useRef, useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface VideoCallProps {
  onEnd: () => void;
  participantName?: string;
}

const VideoCall = ({ onEnd, participantName = "Dr. Rajesh Kumar" }: VideoCallProps) => {
  const { t } = useTranslation();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // Simulate connecting...
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);
    return () => clearTimeout(connectTimer);
  }, []);

  // Track call time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Access camera and microphone
  useEffect(() => {
    let stream: MediaStream;

    const getMedia = async () => {
      try {
        if (isVideoOn || isAudioOn) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: isVideoOn,
            audio: isAudioOn,
          });
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.error("Media access denied:", err);
      }
    };

    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOn, isAudioOn]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    onEnd();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Video className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">{participantName}</h3>
            <p className="text-sm text-gray-300">
              {isConnected ? formatDuration(callDuration) : "Connecting..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleEndCall}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative flex">
        {/* Remote Video Simulation */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          {isConnected ? (
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-3xl font-semibold">
                  {participantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <p className="text-lg">{participantName}</p>
              <p className="text-sm text-gray-300">Video is off</p>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mb-4 mx-auto"></div>
              <p>Connecting to {participantName}...</p>
            </div>
          )}
        </div>

        {/* Local Video */}
        <Card className="absolute top-4 right-4 w-32 h-24 bg-gray-800 border-gray-600 overflow-hidden">
          <CardContent className="p-0 h-full flex items-center justify-center">
            {isVideoOn && localStream ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <VideoOff className="h-6 w-6 text-gray-400" />
            )}
          </CardContent>
        </Card>

        {/* Chat Overlay */}
        {showChat && (
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-lg z-50">
            <div className="p-4 border-b flex justify-between items-center">
              <h4 className="font-semibold text-sm">In-call Chat</h4>
              <Button size="icon" variant="ghost" onClick={() => setShowChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-muted-foreground">
              <p>No messages yet.</p>
            </div>
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-black/80">
        <div className="flex justify-center items-center gap-4">
          <Button
            variant={isAudioOn ? "secondary" : "destructive"}
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setIsAudioOn(!isAudioOn)}
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={handleEndCall}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>

          <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setShowChat(true)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
