package com.dhia.tunist.admin;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<RangeHeaderFilter> rangeHeaderFilterRegistration() {
        FilterRegistrationBean<RangeHeaderFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RangeHeaderFilter());
        registrationBean.addUrlPatterns("/*"); // Adjust URL patterns as needed
        return registrationBean;
    }
}
