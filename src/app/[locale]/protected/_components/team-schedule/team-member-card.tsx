"use client";

import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Team } from "@/types";

import { RespondsTo } from "./responds-to";

interface TeamMemberCardProps {
  team: Team;
  pcoAccessToken: string;
}

export function TeamMemberCard({ team, pcoAccessToken }: TeamMemberCardProps) {
  const t = useTranslations("pcoSchedule");

  return (
    <div className="flex items-center gap-2">
      <RespondsTo
        pcoId={team.respondsTo!.pcoId}
        pcoAccessToken={pcoAccessToken}>
        {(respondsToUser) => (
          <HoverCard key={team.respondsTo!.pcoId}>
            <HoverCardTrigger asChild>
              <Button variant="link">
                <Avatar>
                  <AvatarImage src={respondsToUser?.avatar} />
                  <AvatarFallback>{"..."}</AvatarFallback>
                </Avatar>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={respondsToUser?.avatar} />
                  <AvatarFallback>{"..."}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">
                    {team.respondsTo?.name}
                  </h4>
                  <p className="text-xs">
                    {t("teamLeader", { team: team.position })}
                  </p>
                  <div className="flex items-center pt-2">
                    <Mail className="opacity-70 mr-2 w-4 h-4" />
                    <span className="text-muted-foreground text-xs">
                      <a href={`mailto:${respondsToUser?.email}`}>
                        {respondsToUser?.email}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center pt-2">
                    <Phone className="opacity-70 mr-2 w-4 h-4" />
                    <span className="text-muted-foreground text-xs">
                      <a
                        href={`https://api.whatsapp.com/send?phone=${respondsToUser?.cleanPhoneNumber}`}>
                        {respondsToUser?.phoneNumber}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </RespondsTo>
    </div>
  );
}
