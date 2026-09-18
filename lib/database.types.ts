export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line: string | null
          created_at: string | null
          customer_id: string | null
          delivery_notes: string | null
          department: string | null
          id: string
          is_default: boolean | null
          label: string | null
          municipio: string | null
        }
        Insert: {
          address_line?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivery_notes?: string | null
          department?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          municipio?: string | null
        }
        Update: {
          address_line?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivery_notes?: string | null
          department?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          municipio?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      blend_bulk: {
        Row: {
          id: string
          name_es: string
          ounces: number
          updated_at: string
        }
        Insert: {
          id: string
          name_es: string
          ounces?: number
          updated_at?: string
        }
        Update: {
          id?: string
          name_es?: string
          ounces?: number
          updated_at?: string
        }
        Relationships: []
      }
      blend_recipes: {
        Row: {
          blend_id: string
          grams_per_oz: number
          herb_id: string
        }
        Insert: {
          blend_id: string
          grams_per_oz: number
          herb_id: string
        }
        Update: {
          blend_id?: string
          grams_per_oz?: number
          herb_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blend_recipes_blend_id_fkey"
            columns: ["blend_id"]
            isOneToOne: false
            referencedRelation: "blend_bulk"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blend_recipes_herb_id_fkey"
            columns: ["herb_id"]
            isOneToOne: false
            referencedRelation: "herb_inventory"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      herb_inventory: {
        Row: {
          grams: number
          id: string
          name_es: string
          updated_at: string
        }
        Insert: {
          grams?: number
          id: string
          name_es: string
          updated_at?: string
        }
        Update: {
          grams?: number
          id?: string
          name_es?: string
          updated_at?: string
        }
        Relationships: []
      }
      herbs_inventory: {
        Row: {
          id: string
          min_stock_g: number
          name: string
          notes: string | null
          stock_g: number
          updated_at: string | null
        }
        Insert: {
          id?: string
          min_stock_g?: number
          name: string
          notes?: string | null
          stock_g?: number
          updated_at?: string | null
        }
        Update: {
          id?: string
          min_stock_g?: number
          name?: string
          notes?: string | null
          stock_g?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number
          subtotal_q: number | null
          unit_price_q: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number
          subtotal_q?: number | null
          unit_price_q: number
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number
          subtotal_q?: number | null
          unit_price_q?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_id: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          customer_id: string | null
          delivery_type: string
          email_sent: boolean | null
          id: string
          notes: string | null
          order_number: string | null
          payment_method: string | null
          payment_ref: string | null
          ship_address_line: string | null
          ship_department: string | null
          ship_municipio: string | null
          shipping_q: number | null
          status: string
          stock_deducted: boolean
          stock_deducted_at: string | null
          total_q: number
          updated_at: string | null
        }
        Insert: {
          address_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivery_type?: string
          email_sent?: boolean | null
          id?: string
          notes?: string | null
          order_number?: string | null
          payment_method?: string | null
          payment_ref?: string | null
          ship_address_line?: string | null
          ship_department?: string | null
          ship_municipio?: string | null
          shipping_q?: number | null
          status?: string
          stock_deducted?: boolean
          stock_deducted_at?: string | null
          total_q: number
          updated_at?: string | null
        }
        Update: {
          address_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivery_type?: string
          email_sent?: boolean | null
          id?: string
          notes?: string | null
          order_number?: string | null
          payment_method?: string | null
          payment_ref?: string | null
          ship_address_line?: string | null
          ship_department?: string | null
          ship_municipio?: string | null
          shipping_q?: number | null
          status?: string
          stock_deducted?: boolean
          stock_deducted_at?: string | null
          total_q?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      production_log: {
        Row: {
          action: string
          blend_id: string | null
          created_at: string
          detail: Json | null
          id: number
          sku: string | null
        }
        Insert: {
          action: string
          blend_id?: string | null
          created_at?: string
          detail?: Json | null
          id?: number
          sku?: string | null
        }
        Update: {
          action?: string
          blend_id?: string | null
          created_at?: string
          detail?: Json | null
          id?: number
          sku?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          blend_id: string | null
          created_at: string | null
          format: string
          id: string
          is_active: boolean
          name: string
          oz_per_unit: number | null
          price_q: number
          size: string
          sku: string
          stock: number
        }
        Insert: {
          blend_id?: string | null
          created_at?: string | null
          format: string
          id?: string
          is_active?: boolean
          name: string
          oz_per_unit?: number | null
          price_q: number
          size: string
          sku: string
          stock?: number
        }
        Update: {
          blend_id?: string | null
          created_at?: string | null
          format?: string
          id?: string
          is_active?: boolean
          name?: string
          oz_per_unit?: number | null
          price_q?: number
          size?: string
          sku?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_blend_id_fkey"
            columns: ["blend_id"]
            isOneToOne: false
            referencedRelation: "blend_bulk"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      stock_alerts: {
        Row: {
          format: string | null
          name: string | null
          nivel: string | null
          size: string | null
          sku: string | null
          stock: number | null
          unidades_por_producir: number | null
        }
        Insert: {
          format?: string | null
          name?: string | null
          nivel?: never
          size?: string | null
          sku?: string | null
          stock?: number | null
          unidades_por_producir?: never
        }
        Update: {
          format?: string | null
          name?: string | null
          nivel?: never
          size?: string | null
          sku?: string | null
          stock?: number | null
          unidades_por_producir?: never
        }
        Relationships: []
      }
    }
    Functions: {
      empacar_producto: {
        Args: { p_sku: string; p_unidades: number }
        Returns: Json
      }
      preparar_mezcla: {
        Args: { p_blend: string; p_oz: number }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
