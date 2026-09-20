export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          phone: string | null;
          status: string | null;
          subject: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          phone?: string | null;
          status?: string | null;
          subject: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          phone?: string | null;
          status?: string | null;
          subject?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      donations: {
        Row: {
          created_at: string;
          donation_type: string;
          email: string | null;
          id: string;
          message: string | null;
          name: string | null;
          phone: string | null;
          status: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          donation_type: string;
          email?: string | null;
          id?: string;
          message?: string | null;
          name?: string | null;
          phone?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          donation_type?: string;
          email?: string | null;
          id?: string;
          message?: string | null;
          name?: string | null;
          phone?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          icon: string | null;
          image_url: string | null;
          requirements: string[] | null;
          how_to_access: string;
          contact_email: string | null;
          contact_phone: string | null;
          contact_address: string | null;
          is_active: boolean;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          icon?: string | null;
          image_url?: string | null;
          requirements?: string[] | null;
          how_to_access: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          contact_address?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          icon?: string | null;
          image_url?: string | null;
          requirements?: string[] | null;
          how_to_access?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          contact_address?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          description: string;
          requirements: string[];
          benefits: string[] | null;
          salary_range: string | null;
          job_type: string;
          work_mode: string;
          location: string;
          contact_email: string | null;
          contact_phone: string | null;
          application_url: string | null;
          application_deadline: string | null;
          is_active: boolean;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          description: string;
          requirements: string[];
          benefits?: string[] | null;
          salary_range?: string | null;
          job_type: string;
          work_mode: string;
          location: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          application_url?: string | null;
          application_deadline?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          description?: string;
          requirements?: string[];
          benefits?: string[] | null;
          salary_range?: string | null;
          job_type?: string;
          work_mode?: string;
          location?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          application_url?: string | null;
          application_deadline?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          institution: string;
          instructor: string | null;
          duration_hours: number | null;
          modality: string;
          level: string;
          prerequisites: string[] | null;
          syllabus: string | null;
          certificate: boolean;
          cost: number | null;
          currency: string;
          start_date: string | null;
          end_date: string | null;
          enrollment_deadline: string | null;
          max_students: number | null;
          image_url: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          enrollment_url: string | null;
          is_active: boolean;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          institution: string;
          instructor?: string | null;
          duration_hours?: number | null;
          modality: string;
          level: string;
          prerequisites?: string[] | null;
          syllabus?: string | null;
          certificate?: boolean;
          cost?: number | null;
          currency?: string;
          start_date?: string | null;
          end_date?: string | null;
          enrollment_deadline?: string | null;
          max_students?: number | null;
          image_url?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          enrollment_url?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          institution?: string;
          instructor?: string | null;
          duration_hours?: number | null;
          modality?: string;
          level?: string;
          prerequisites?: string[] | null;
          syllabus?: string | null;
          certificate?: boolean;
          cost?: number | null;
          currency?: string;
          start_date?: string | null;
          end_date?: string | null;
          enrollment_deadline?: string | null;
          max_students?: number | null;
          image_url?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          enrollment_url?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          start_date: string;
          end_date: string | null;
          start_time: string | null;
          end_time: string | null;
          location: string | null;
          address: string | null;
          online_url: string | null;
          max_attendees: number | null;
          image_url: string | null;
          organizer: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          registration_url: string | null;
          registration_deadline: string | null;
          is_free: boolean;
          cost: number | null;
          currency: string;
          is_active: boolean;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          start_date: string;
          end_date?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          location?: string | null;
          address?: string | null;
          online_url?: string | null;
          max_attendees?: number | null;
          image_url?: string | null;
          organizer?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          registration_url?: string | null;
          registration_deadline?: string | null;
          is_free?: boolean;
          cost?: number | null;
          currency?: string;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          start_date?: string;
          end_date?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          location?: string | null;
          address?: string | null;
          online_url?: string | null;
          max_attendees?: number | null;
          image_url?: string | null;
          organizer?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          registration_url?: string | null;
          registration_deadline?: string | null;
          is_free?: boolean;
          cost?: number | null;
          currency?: string;
          is_active?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          document_type: string;
          file_url: string | null;
          external_url: string | null;
          language: string;
          version: string | null;
          issuing_authority: string | null;
          valid_from: string | null;
          valid_until: string | null;
          tags: string[] | null;
          is_public: boolean;
          is_active: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          document_type: string;
          file_url?: string | null;
          external_url?: string | null;
          language?: string;
          version?: string | null;
          issuing_authority?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
          tags?: string[] | null;
          is_public?: boolean;
          is_active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          document_type?: string;
          file_url?: string | null;
          external_url?: string | null;
          language?: string;
          version?: string | null;
          issuing_authority?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
          tags?: string[] | null;
          is_public?: boolean;
          is_active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          cpf: string | null;
          phone: string | null;
          birth_date: string | null;
          nationality: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          zip_code: string | null;
          education_level: string | null;
          profession: string | null;
          skills: string[] | null;
          bio: string | null;
          avatar_url: string | null;
          role: string;
          status: string;
          email_notifications: boolean;
          whatsapp_notifications: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          cpf?: string | null;
          phone?: string | null;
          birth_date?: string | null;
          nationality?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip_code?: string | null;
          education_level?: string | null;
          profession?: string | null;
          skills?: string[] | null;
          bio?: string | null;
          avatar_url?: string | null;
          role?: string;
          status?: string;
          email_notifications?: boolean;
          whatsapp_notifications?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          cpf?: string | null;
          phone?: string | null;
          birth_date?: string | null;
          nationality?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip_code?: string | null;
          education_level?: string | null;
          profession?: string | null;
          skills?: string[] | null;
          bio?: string | null;
          avatar_url?: string | null;
          role?: string;
          status?: string;
          email_notifications?: boolean;
          whatsapp_notifications?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_services: {
        Row: {
          id: string;
          user_id: string;
          service_id: string;
          status: string;
          notes: string | null;
          requested_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_id: string;
          status?: string;
          notes?: string | null;
          requested_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_id?: string;
          status?: string;
          notes?: string | null;
          requested_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_services_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_services_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
      user_job_applications: {
        Row: {
          id: string;
          user_id: string;
          job_id: string;
          status: string;
          cover_letter: string | null;
          cv_url: string | null;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          job_id: string;
          status?: string;
          cover_letter?: string | null;
          cv_url?: string | null;
          applied_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          job_id?: string;
          status?: string;
          cover_letter?: string | null;
          cv_url?: string | null;
          applied_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_job_applications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_job_applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
      user_course_enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          status: string;
          progress: number;
          completed_at: string | null;
          certificate_url: string | null;
          enrolled_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          status?: string;
          progress?: number;
          completed_at?: string | null;
          certificate_url?: string | null;
          enrolled_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          status?: string;
          progress?: number;
          completed_at?: string | null;
          certificate_url?: string | null;
          enrolled_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_course_enrollments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_course_enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      user_event_registrations: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          status: string;
          attended: boolean;
          registered_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          status?: string;
          attended?: boolean;
          registered_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          status?: string;
          attended?: boolean;
          registered_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_event_registrations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_event_registrations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          priority: string;
          target_audience: string[];
          image_url: string | null;
          link_url: string | null;
          link_text: string | null;
          published_at: string | null;
          expires_at: string | null;
          is_active: boolean;
          is_pinned: boolean;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category: string;
          priority: string;
          target_audience?: string[];
          image_url?: string | null;
          link_url?: string | null;
          link_text?: string | null;
          published_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: string;
          priority?: string;
          target_audience?: string[];
          image_url?: string | null;
          link_url?: string | null;
          link_text?: string | null;
          published_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_role: string | null;
          author_avatar_url: string | null;
          content: string;
          rating: number | null;
          is_approved: boolean;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_name: string;
          author_role?: string | null;
          author_avatar_url?: string | null;
          content: string;
          rating?: number | null;
          is_approved?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_name?: string;
          author_role?: string | null;
          author_avatar_url?: string | null;
          content?: string;
          rating?: number | null;
          is_approved?: boolean;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;