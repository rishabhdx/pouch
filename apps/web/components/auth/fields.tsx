"use client";

import { Button } from "@pouch/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@pouch/ui/components/field";
import { Input } from "@pouch/ui/components/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export const NameField = ({
  field,
  isInvalid,
  placeholder,
  disabled
}: {
  field: any;
  isInvalid: boolean;
  placeholder?: string;
  disabled?: boolean;
}) => {
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
      <Input
        type="text"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder || "John Doe"}
        autoComplete="off"
        disabled={disabled || false}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export const EmailField = ({
  field,
  isInvalid,
  placeholder,
  disabled
}: {
  field: any;
  isInvalid: boolean;
  placeholder?: string;
  disabled?: boolean;
}) => {
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
      <Input
        type="email"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder || "email@example.com"}
        autoComplete="off"
        disabled={disabled || false}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export const PasswordField = ({
  field,
  isInvalid,
  placeholder,
  disabled
}: {
  field: any;
  isInvalid: boolean;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder || "••••••••"}
          autoComplete="off"
          disabled={disabled || false}
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => setIsVisible(prevState => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {isVisible ? (
            <EyeClosed className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export const ConfirmPasswordField = ({
  field,
  isInvalid,
  placeholder,
  disabled
}: {
  field: any;
  isInvalid: boolean;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder || "••••••••"}
          autoComplete="off"
          disabled={disabled || false}
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => setIsVisible(prevState => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {isVisible ? (
            <EyeClosed className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
