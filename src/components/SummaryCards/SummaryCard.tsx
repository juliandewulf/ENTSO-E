import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: SvgIconComponent;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  additionalInfo?: string[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'primary',
  trend,
  additionalInfo,
}) => {
  const theme = useTheme();

  const getAccentColor = (colorType: string) => {
    switch (colorType) {
      case 'primary':
        return theme.palette.primary.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      case 'secondary':
        return theme.palette.accent.main;
      default:
        return theme.palette.accent.main;
    }
  };

  const accentColor = getAccentColor(color);

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        backgroundColor: theme.palette.surface.main,
        border: `1px solid ${theme.palette.surface.border}`,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: accentColor,
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 32px ${accentColor}20`,
        },
      }}
    >
      {/* Accent line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}60 100%)`,
        }}
      />

      <CardContent sx={{ p: 3, height: '100%' }}>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          mb={2}
        >
          <Box flex={1}>
            <Typography
              variant="overline"
              component="h3"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              data-testid="summary-card-value"
              sx={{
                color: accentColor,
                fontWeight: 700,
                fontSize: '2.25rem',
                lineHeight: 1.2,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {value}
            </Typography>
          </Box>
          {Icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1.5,
                backgroundColor: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
                ml: 2,
              }}
            >
              <Icon
                sx={{
                  fontSize: 24,
                  color: accentColor,
                }}
              />
            </Box>
          )}
        </Box>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.875rem',
              fontWeight: 400,
              mb: 2,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {trend && (
          <Box mb={2}>
            <Chip
              label={`${trend.isPositive ? '+' : ''}${trend.value}%`}
              size="small"
              sx={{
                backgroundColor: trend.isPositive
                  ? `${theme.palette.success.main}20`
                  : `${theme.palette.error.main}20`,
                color: trend.isPositive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                border: `1px solid ${
                  trend.isPositive
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }40`,
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          </Box>
        )}

        {additionalInfo && additionalInfo.length > 0 && (
          <Box>
            {additionalInfo.map((info, index) => (
              <Typography
                key={index}
                variant="caption"
                component="div"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  mb: 0.5,
                  '&:last-child': { mb: 0 },
                }}
              >
                {info}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
