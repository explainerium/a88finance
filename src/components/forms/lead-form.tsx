"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { financeTypes } from "@/lib/site-config";
import { submitLead } from "@/services/actions/submit-lead";

type LeadFormProps = {
  /** "callback" = name/phone/type. "full" = adds email + message. */
  variant?: "callback" | "full";
  submitLabel?: string;
};

export function LeadForm({
  variant = "callback",
  submitLabel = "Get Pre-Approved",
}: LeadFormProps) {
  const [isPending, startTransition] = useTransition();
  const isFull = variant === "full";

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      financeType: undefined,
      message: "",
      company: "",
    },
  });

  function onSubmit(values: LeadInput) {
    startTransition(async () => {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ""));
      const result = await submitLead(undefined, fd);
      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
          {...form.register("company")}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="field">
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="field">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="04xx xxx xxx"
                  autoComplete="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isFull && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="field">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="financeType"
          render={({ field }) => (
            <FormItem className="field">
              <FormLabel>Finance type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a finance type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {financeTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isFull && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="field">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Tell us a little about what you need…"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          variant="gold"
          size="pill"
          className="w-full"
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
