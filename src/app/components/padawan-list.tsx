"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import type { Padawan } from "@/core/domain/models/padawan";

type PadawanListProps = {
  padawans: Padawan[];
};

const skillEmoji = {
  combat: "⚔️ Lightsaber Combat",
  healing: "💚 Force Healing",
  meditation: "🧘 Deep Meditation",
  telepathy: "🧠 Telepathy",
} as const;

export function PadawanList({ padawans }: PadawanListProps) {
  if (padawans.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No Padawans registered yet...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidates List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Homeworld</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Midichlorians</TableHead>
              <TableHead>Registration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {padawans.map((padawan) => (
              <TableRow key={padawan.id}>
                <TableCell className="font-medium">{padawan.name}</TableCell>
                <TableCell>{padawan.age} years</TableCell>
                <TableCell>{padawan.homeworld}</TableCell>
                <TableCell>{skillEmoji[padawan.primarySkill]}</TableCell>
                <TableCell>
                  {padawan.midichlorianCount.toLocaleString()}
                </TableCell>
                <TableCell>
                  {format(new Date(padawan.createdAt!), "Pp", { locale: enUS })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
